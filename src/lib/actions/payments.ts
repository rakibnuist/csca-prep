"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidateTrackPath } from "@/lib/section";
import {
  fulfillPaidOrder,
  generateMethodUuid,
  getEnvEpayMethod,
  isValidHttpUrl,
  normalizeBaseUrl,
} from "@/lib/payments/epay";

export type PaymentAdminState = {
  ok?: boolean;
  message?: string;
  error?: string;
} | null;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function revalidateBillingAndAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/payments");
  revalidateTrackPath("/billing");
}

export async function savePaymentMethodAction(
  _prev: PaymentAdminState,
  formData: FormData,
): Promise<PaymentAdminState> {
  await requireAdmin();

  const id = str(formData, "id");
  const name = str(formData, "name").slice(0, 80);
  const iconRaw = str(formData, "icon").slice(0, 400);
  const notifyDomainRaw = str(formData, "notifyDomain").slice(0, 200);
  const feePercentRaw = Number(str(formData, "feePercent") || "0");
  const feeFixedYuanRaw = Number(str(formData, "feeFixedYuan") || "0");
  const sortRaw = Number.parseInt(str(formData, "sort") || "0", 10);
  const enable = formData.get("enable") === "true" || formData.get("enable") === "on";
  const gatewayUrlRaw = str(formData, "gatewayUrl").slice(0, 250);
  const merchantId = str(formData, "merchantId").slice(0, 100);
  const secretKey = str(formData, "secretKey").slice(0, 255);
  const paymentType = str(formData, "paymentType").slice(0, 40);

  if (!name) return { error: "Display name is required." };
  if (iconRaw && !isValidHttpUrl(iconRaw)) {
    return { error: "Icon URL must start with http:// or https://." };
  }
  if (notifyDomainRaw && !isValidHttpUrl(notifyDomainRaw)) {
    return { error: "Notify domain must be a valid http:// or https:// URL." };
  }
  if (!Number.isFinite(feePercentRaw) || feePercentRaw < 0 || feePercentRaw > 100) {
    return { error: "Percentage fee must be between 0 and 100." };
  }
  if (!Number.isFinite(feeFixedYuanRaw) || feeFixedYuanRaw < 0 || feeFixedYuanRaw > 10_000) {
    return { error: "Fixed fee must be a valid non-negative amount." };
  }
  if (!gatewayUrlRaw || !isValidHttpUrl(gatewayUrlRaw)) {
    return { error: "Payment gateway URL must start with http:// or https://." };
  }
  if (!merchantId) return { error: "Merchant ID (pid) is required." };
  if (!id && !secretKey) return { error: "Secret key is required when adding a gateway." };

  const data = {
    name,
    gateway: "EPAY",
    icon: iconRaw || null,
    notifyDomain: notifyDomainRaw ? normalizeBaseUrl(notifyDomainRaw) : null,
    feePercent: Math.round(feePercentRaw * 100) / 100,
    feeFixedCents: Math.round(feeFixedYuanRaw * 100),
    enable,
    sort: Number.isNaN(sortRaw) ? 0 : sortRaw,
    gatewayUrl: normalizeBaseUrl(gatewayUrlRaw),
    merchantId,
    paymentType: paymentType || null,
  };

  if (id) {
    const existing = await prisma.paymentMethod.findUnique({ where: { id } });
    if (!existing) return { error: "Payment method not found." };
    await prisma.paymentMethod.update({
      where: { id },
      data: {
        ...data,
        ...(secretKey ? { secretKey } : {}),
      },
    });
    revalidateBillingAndAdmin();
    return { ok: true, message: `Updated "${name}".` };
  }

  await prisma.paymentMethod.create({
    data: {
      uuid: generateMethodUuid(),
      ...data,
      secretKey,
    },
  });

  revalidateBillingAndAdmin();
  return { ok: true, message: `Created "${name}".` };
}

export async function togglePaymentMethodAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const enable = str(formData, "enable") === "true";
  if (!id) return;
  await prisma.paymentMethod.update({ where: { id }, data: { enable } }).catch(() => undefined);
  revalidateBillingAndAdmin();
}

export async function deletePaymentMethodAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  await prisma.paymentMethod.delete({ where: { id } }).catch(() => undefined);
  revalidateBillingAndAdmin();
}

export async function importEnvPaymentMethodAction(): Promise<void> {
  await requireAdmin();
  const envMethod = getEnvEpayMethod();
  if (!envMethod) return;

  const existingCount = await prisma.paymentMethod.count();
  if (existingCount > 0) return;

  await prisma.paymentMethod.create({
    data: {
      uuid: generateMethodUuid(),
      name: envMethod.name,
      gateway: "EPAY",
      icon: envMethod.icon,
      notifyDomain: envMethod.notifyDomain,
      feePercent: envMethod.feePercent,
      feeFixedCents: envMethod.feeFixedCents,
      enable: true,
      sort: 0,
      gatewayUrl: envMethod.gatewayUrl,
      merchantId: envMethod.merchantId,
      secretKey: envMethod.secretKey,
      paymentType: envMethod.paymentType,
    },
  });

  revalidateBillingAndAdmin();
}

export async function adminCancelOrderAction(formData: FormData) {
  await requireAdmin();
  const tradeNo = str(formData, "tradeNo");
  if (!tradeNo) return;
  await prisma.order.updateMany({
    where: { tradeNo, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
  revalidateBillingAndAdmin();
}

export async function adminMarkOrderPaidAction(formData: FormData) {
  const admin = await requireAdmin();
  const tradeNo = str(formData, "tradeNo");
  if (!tradeNo) return;
  await fulfillPaidOrder({
    tradeNo,
    callbackNo: `ADMIN-${admin.id.slice(-6).toUpperCase()}`,
  });
  revalidateBillingAndAdmin();
}
