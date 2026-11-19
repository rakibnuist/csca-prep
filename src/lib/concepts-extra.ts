import type { Concept } from "./concepts";

/** Physics, Chemistry and Professional Chinese concept lessons. */
export const EXTRA_CONCEPTS: Concept[] = [
  /* ───────────────────────────── Physics ───────────────────────────── */
  {
    topicCode: "P1.1",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Kinematics",
    titleZh: "运动学",
    summary:
      "Motion in a straight line described by displacement, velocity and acceleration. The exam tests the equations of motion and motion graphs.",
    sections: [
      {
        heading: "Core idea",
        body: "Velocity is the rate of change of displacement; acceleration is the rate of change of velocity. For constant acceleration the three kinematic equations link initial velocity u, final velocity v, acceleration a, displacement s and time t.",
      },
      {
        heading: "How to solve it fast",
        body: "List the known quantities and choose the equation that omits the one you do not need. Keep one direction positive throughout. On a velocity-time graph, the slope is acceleration and the area under the line is displacement.",
      },
    ],
    formulas: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "s = ((u + v)/2) · t"],
    traps: [
      "Mixing sign conventions mid-question.",
      "Using average speed where instantaneous velocity is asked for.",
      "Forgetting that deceleration is a negative acceleration.",
    ],
    figureKey: "motion",
  },
  {
    topicCode: "P1.2",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Newton's laws",
    titleZh: "牛顿运动定律",
    summary:
      "Forces change motion. Net force equals mass times acceleration, and every force has an equal and opposite reaction.",
    sections: [
      {
        heading: "Core idea",
        body: "First law: with no net force, velocity stays constant. Second law: ΣF = ma. Third law: forces come in equal and opposite pairs acting on different bodies.",
      },
      {
        heading: "How to solve it fast",
        body: "Draw a free-body diagram for each body, choose axes, resolve forces, then apply ΣF = ma in each direction. For connected bodies, solve each separately and link them through the shared acceleration or tension.",
      },
    ],
    formulas: ["ΣF = ma", "W = mg", "f ≤ μN", "action = −reaction"],
    traps: [
      "Adding an action and its reaction force on the same body — they act on different bodies.",
      "Assuming friction always opposes the applied force rather than the motion.",
      "Treating weight and mass as the same quantity.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "P1.3",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Momentum and impulse",
    titleZh: "动量与冲量",
    summary:
      "Momentum p = mv. Impulse equals the change in momentum, and total momentum is conserved when external forces are negligible.",
    sections: [
      {
        heading: "Core idea",
        body: "Impulse J = FΔt = Δp. In a collision or explosion, total momentum before equals total momentum after, provided external forces can be ignored.",
      },
      {
        heading: "How to solve it fast",
        body: "Choose a positive direction and write total momentum before = total momentum after. Kinetic energy is conserved only in elastic collisions; inelastic collisions still conserve momentum.",
      },
    ],
    formulas: ["p = mv", "J = FΔt = Δp", "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂"],
    traps: [
      "Assuming kinetic energy is always conserved.",
      "Ignoring direction — momentum is a vector.",
      "Confusing impulse (force × time) with force.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "P1.4",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Work, energy and conservation",
    titleZh: "功、能与能量守恒",
    summary:
      "Work transfers energy. In a closed system, mechanical energy is conserved when only conservative forces act.",
    sections: [
      {
        heading: "Core idea",
        body: "Work W = Fs cosθ. Kinetic energy is ½mv² and gravitational potential energy is mgh. The work-energy theorem says net work equals the change in kinetic energy.",
      },
      {
        heading: "How to solve it fast",
        body: "Identify the energy stores at the start and end, set initial energy = final energy, and subtract energy lost to friction. Watch the angle: a force perpendicular to motion does no work.",
      },
    ],
    formulas: ["W = Fs cosθ", "KE = ½mv²", "PE = mgh", "W_net = ΔKE"],
    traps: [
      "Counting a force that is perpendicular to the motion.",
      "Forgetting energy dissipated by friction.",
      "Using velocity instead of its square in kinetic energy.",
    ],
    figureKey: "motion",
  },
  {
    topicCode: "P1.5",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Circular motion and gravitation",
    titleZh: "圆周运动与万有引力",
    summary:
      "Uniform circular motion needs a centripetal force toward the centre; for orbits, gravity supplies it.",
    sections: [
      {
        heading: "Core idea",
        body: "The speed is constant but the velocity changes direction, so there is an acceleration v²/r toward the centre. The required force is F = mv²/r.",
      },
      {
        heading: "How to solve it fast",
        body: "Identify the real force(s) acting toward the centre, set their sum equal to mv²/r, and use v = 2πr/T when a period is given.",
      },
    ],
    formulas: ["F = mv²/r", "a = v²/r", "v = 2πr/T", "GMm/r² = mv²/r"],
    traps: [
      "Inventing an outward centrifugal force.",
      "Using diameter where radius is required.",
      "Thinking the speed changes in uniform circular motion.",
    ],
  },
  {
    topicCode: "P1.6",
    subjectCode: "PHYS",
    unitEn: "Mechanics",
    titleEn: "Simple harmonic motion and waves",
    titleZh: "简谐振动与机械波",
    summary:
      "Simple harmonic motion has a restoring acceleration proportional to displacement; waves transfer energy, not matter.",
    sections: [
      {
        heading: "Core idea",
        body: "In SHM, a = −ω²x, so the body oscillates about equilibrium with period T = 2π√(m/k) for a spring. A wave has wavelength λ, frequency f and speed v = fλ.",
      },
      {
        heading: "How to solve it fast",
        body: "Relate amplitude, period and frequency. For waves use v = fλ, and add displacements with superposition for interference.",
      },
    ],
    formulas: ["T = 2π√(m/k)", "T = 2π√(l/g)", "v = fλ", "f = 1/T"],
    traps: [
      "Confusing period with frequency.",
      "Thinking the medium travels with the wave.",
      "Forgetting that wave energy depends on amplitude squared.",
    ],
    figureKey: "wave",
  },
  {
    topicCode: "P2.1",
    subjectCode: "PHYS",
    unitEn: "Electromagnetism",
    titleEn: "Electrostatics",
    titleZh: "静电场",
    summary:
      "Charges exert forces through the electric field. Coulomb's law gives the force and field lines show its direction.",
    sections: [
      {
        heading: "Core idea",
        body: "The Coulomb force is F = kq₁q₂/r². The electric field is E = F/q, and between parallel plates E = V/d.",
      },
      {
        heading: "How to solve it fast",
        body: "Find each force vector and add them, using the signs of the charges. Use symmetry to simplify symmetric arrangements.",
      },
    ],
    formulas: ["F = kq₁q₂/r²", "E = F/q", "E = V/d", "W = qV"],
    traps: [
      "Forgetting the force depends on the square of the distance.",
      "Drawing field lines from negative to positive (it is the reverse).",
      "Using the distance between surfaces instead of between centres.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "P2.2",
    subjectCode: "PHYS",
    unitEn: "Electromagnetism",
    titleEn: "Direct current circuits",
    titleZh: "直流电路",
    summary:
      "Ohm's law and Kirchhoff's rules solve steady-state circuits; series and parallel rules simplify them.",
    sections: [
      {
        heading: "Core idea",
        body: "V = IR. In series, current is shared and resistance adds; in parallel, voltage is shared and the reciprocals of resistance add. Power is P = VI = I²R.",
      },
      {
        heading: "How to solve it fast",
        body: "Reduce series and parallel groups to one equivalent resistance, find the total current, then work back through each component.",
      },
    ],
    formulas: ["V = IR", "R_series = R₁ + R₂", "1/R_parallel = 1/R₁ + 1/R₂", "P = VI"],
    traps: [
      "Adding parallel resistances directly.",
      "Thinking current is used up as it passes components.",
      "Ignoring internal resistance of the cell.",
    ],
    figureKey: "circuit",
  },
  {
    topicCode: "P2.3",
    subjectCode: "PHYS",
    unitEn: "Electromagnetism",
    titleEn: "Magnetic field",
    titleZh: "磁场",
    summary:
      "Currents and moving charges create magnetic fields; a charge moving in a field feels F = qvB sinθ.",
    sections: [
      {
        heading: "Core idea",
        body: "The field direction follows the right-hand rule. A current-carrying wire feels F = BIL sinθ and a moving charge feels F = qvB sinθ.",
      },
      {
        heading: "How to solve it fast",
        body: "Use the right-hand rule for direction and sinθ for magnitude. For circular motion in a magnetic field, set qvB = mv²/r.",
      },
    ],
    formulas: ["F = BIL sinθ", "F = qvB sinθ", "r = mv/(qB)"],
    traps: [
      "Forgetting sinθ — the force is zero when motion is parallel to the field.",
      "Using the wrong hand or rule for direction.",
      "Ignoring the sign of the charge when finding direction.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "P2.4",
    subjectCode: "PHYS",
    unitEn: "Electromagnetism",
    titleEn: "Electromagnetic induction",
    titleZh: "电磁感应",
    summary:
      "A changing magnetic flux induces an EMF (Faraday) whose direction opposes the change (Lenz).",
    sections: [
      {
        heading: "Core idea",
        body: "EMF = −dΦ/dt and Φ = BA cosθ. Moving a conductor through a field gives EMF = BLv.",
      },
      {
        heading: "How to solve it fast",
        body: "Find the change in flux, divide by the time taken, and use Lenz's law to decide the direction. For a moving rod, use BLv.",
      },
    ],
    formulas: ["ε = −ΔΦ/Δt", "Φ = BA cosθ", "ε = BLv"],
    traps: [
      "Dropping the minus sign from Lenz's law.",
      "Expecting an EMF from a static, unchanging field.",
      "Mixing magnetic flux density with flux.",
    ],
    figureKey: "vector",
  },
  {
    topicCode: "P3.1",
    subjectCode: "PHYS",
    unitEn: "Thermodynamics",
    titleEn: "Kinetic theory of gases",
    titleZh: "气体动理论",
    summary:
      "Gas pressure comes from molecules colliding with the walls; temperature measures average kinetic energy.",
    sections: [
      {
        heading: "Core idea",
        body: "Average kinetic energy is proportional to absolute temperature: ½mv² = (3/2)kT. Pressure rises with temperature and with the number of molecules.",
      },
      {
        heading: "How to solve it fast",
        body: "Convert temperature to kelvin, then relate pressure, volume and temperature using the gas laws.",
      },
    ],
    formulas: ["E_k = (3/2)kT", "pV = (1/3)Nmv²", "T(K) = T(°C) + 273"],
    traps: [
      "Using Celsius in gas equations.",
      "Confusing average speed with rms speed.",
      "Assuming every molecule moves at the same speed.",
    ],
  },
  {
    topicCode: "P3.2",
    subjectCode: "PHYS",
    unitEn: "Thermodynamics",
    titleEn: "Ideal gas equation of state",
    titleZh: "理想气体状态方程",
    summary:
      "pV = nRT links pressure, volume, amount and temperature of an ideal gas.",
    sections: [
      {
        heading: "Core idea",
        body: "For a fixed amount of gas, pV/T is constant, giving the combined gas law. Use n = m/M to convert mass to moles.",
      },
      {
        heading: "How to solve it fast",
        body: "Always convert to kelvin and consistent units (pascals, cubic metres) before substituting.",
      },
    ],
    formulas: ["pV = nRT", "p₁V₁/T₁ = p₂V₂/T₂", "n = m/M"],
    traps: [
      "Forgetting to convert to kelvin.",
      "Mixing pascals with kPa, or litres with cubic metres.",
      "Using the ideal gas law near condensation.",
    ],
  },
  {
    topicCode: "P3.3",
    subjectCode: "PHYS",
    unitEn: "Thermodynamics",
    titleEn: "First law of thermodynamics",
    titleZh: "热力学第一定律",
    summary:
      "Energy is conserved: heat added equals the change in internal energy plus the work done by the gas.",
    sections: [
      {
        heading: "Core idea",
        body: "ΔU = Q − W. Work done by a gas at constant pressure is W = pΔV.",
      },
      {
        heading: "How to solve it fast",
        body: "Fix a sign convention (work done by the gas versus on the gas) and track heat entering or leaving.",
      },
    ],
    formulas: ["ΔU = Q − W", "W = pΔV", "Q = mcΔT"],
    traps: [
      "Mixing sign conventions mid-calculation.",
      "Assuming zero work in a constant-volume process (correct) but not in constant-pressure.",
      "Confusing heat with temperature.",
    ],
  },
  {
    topicCode: "P4.1",
    subjectCode: "PHYS",
    unitEn: "Optics",
    titleEn: "Geometrical optics",
    titleZh: "几何光学",
    summary:
      "Light travels in straight lines; mirrors and lenses form images by reflection and refraction.",
    sections: [
      {
        heading: "Core idea",
        body: "Refraction obeys Snell's law n₁sinθ₁ = n₂sinθ₂. The thin-lens equation links object distance, image distance and focal length.",
      },
      {
        heading: "How to solve it fast",
        body: "Draw a ray diagram and apply 1/f = 1/u + 1/v with a consistent sign convention for real and virtual images.",
      },
    ],
    formulas: ["n₁sinθ₁ = n₂sinθ₂", "1/f = 1/u + 1/v", "m = v/u"],
    traps: [
      "Mixing sign conventions for real and virtual images.",
      "Using the wrong angle (with the normal vs the surface).",
      "Forgetting that total internal reflection needs the denser medium.",
    ],
    figureKey: "plane",
  },
  {
    topicCode: "P4.2",
    subjectCode: "PHYS",
    unitEn: "Optics",
    titleEn: "Physical optics",
    titleZh: "物理光学",
    summary:
      "Light interferes and diffracts as a wave, producing fringes, spectra and polarisation.",
    sections: [
      {
        heading: "Core idea",
        body: "Double-slit maxima occur where the path difference is nλ; single-slit diffraction spreads the beam. Light also behaves as photons of energy hf.",
      },
      {
        heading: "How to solve it fast",
        body: "Use d sinθ = nλ for slits and apply the wave model to interference patterns.",
      },
    ],
    formulas: ["d sinθ = nλ", "path difference = nλ", "c = fλ"],
    traps: [
      "Using the wrong slit separation.",
      "Confusing maxima with minima (half-wavelength difference).",
      "Ignoring that the pattern depends on wavelength.",
    ],
    figureKey: "wave",
  },
  {
    topicCode: "P5.1",
    subjectCode: "PHYS",
    unitEn: "Modern Physics",
    titleEn: "Photoelectric effect",
    titleZh: "光电效应",
    summary:
      "Light ejects electrons from a metal only above a threshold frequency; energy arrives in quanta hf.",
    sections: [
      {
        heading: "Core idea",
        body: "Photon energy is E = hf. The maximum kinetic energy of an emitted electron is K_max = hf − φ, where φ is the work function.",
      },
      {
        heading: "How to solve it fast",
        body: "Convert wavelength to frequency with c = fλ, then apply the photoelectric equation.",
      },
    ],
    formulas: ["E = hf", "K_max = hf − φ", "c = fλ"],
    traps: [
      "Thinking brighter light raises electron energy — it raises the count.",
      "Ignoring the threshold frequency.",
      "Using wavelength where frequency is required.",
    ],
    figureKey: "graph",
  },
  {
    topicCode: "P5.2",
    subjectCode: "PHYS",
    unitEn: "Modern Physics",
    titleEn: "Atomic structure",
    titleZh: "原子结构",
    summary:
      "Atoms have a nucleus and quantised electron energy levels; photons are emitted or absorbed on transitions.",
    sections: [
      {
        heading: "Core idea",
        body: "Electrons occupy discrete levels; a transition between levels emits or absorbs a photon of energy ΔE = hf.",
      },
      {
        heading: "How to solve it fast",
        body: "Use energy-level differences to find photon frequencies, then match them to spectral lines.",
      },
    ],
    formulas: ["ΔE = hf = hc/λ", "E_n = −13.6/n² eV (hydrogen)"],
    traps: [
      "Treating electron orbits as classical paths.",
      "Forgetting that the photon energy must match the level gap exactly.",
      "Mixing absorption and emission directions.",
    ],
    figureKey: "atom",
  },
  {
    topicCode: "P5.3",
    subjectCode: "PHYS",
    unitEn: "Modern Physics",
    titleEn: "Nuclear physics",
    titleZh: "原子核物理",
    summary:
      "The nucleus holds protons and neutrons; radioactive decay and nuclear reactions convert mass into energy.",
    sections: [
      {
        heading: "Core idea",
        body: "Decay types are alpha, beta and gamma. Half-life is the time for half a sample to decay. Mass defect converts to energy via E = mc².",
      },
      {
        heading: "How to solve it fast",
        body: "For decay use N = N₀(1/2)^(t/T). Balance mass and atomic numbers in every nuclear equation.",
      },
    ],
    formulas: ["N = N₀(1/2)^(t/T)", "E = mc²", "A = Z + N"],
    traps: [
      "Thinking half-life means half the sample disappears at once.",
      "Failing to balance mass and atomic numbers.",
      "Expecting gamma decay to change mass or charge.",
    ],
    figureKey: "atom",
  },

  /* ───────────────────────────── Chemistry ───────────────────────────── */
  {
    topicCode: "C1.1",
    subjectCode: "CHEM",
    unitEn: "Basic Concepts and Calculations",
    titleEn: "Substances and classification",
    titleZh: "物质及其分类",
    summary:
      "Matter is classified into pure substances (elements, compounds) and mixtures (homogeneous and heterogeneous).",
    sections: [
      {
        heading: "Core idea",
        body: "An element contains one kind of atom; a compound has atoms chemically bonded in a fixed ratio; a mixture can be separated by physical means and has no fixed ratio.",
      },
      {
        heading: "How to solve it fast",
        body: "Classify by composition and by whether it can be separated physically. Distinguish physical changes from chemical changes.",
      },
    ],
    formulas: [],
    traps: [
      "Confusing a compound with a mixture.",
      "Calling a solution a compound.",
      "Assuming every clear liquid is a pure substance.",
    ],
  },
  {
    topicCode: "C1.2",
    subjectCode: "CHEM",
    unitEn: "Basic Concepts and Calculations",
    titleEn: "Chemical language and equations",
    titleZh: "化学用语与方程式",
    summary:
      "Formulas and balanced equations show which substances react and in what proportions.",
    sections: [
      {
        heading: "Core idea",
        body: "Balance atoms on both sides and add state symbols where required. The coefficients of a balanced equation give the mole ratio.",
      },
      {
        heading: "How to solve it fast",
        body: "Balance metals, then non-metals, then hydrogen, then oxygen last. Check charge for ionic equations.",
      },
    ],
    formulas: ["balanced equation", "n = m/M"],
    traps: [
      "Changing subscripts instead of coefficients to balance.",
      "Omitting state symbols when they are required.",
      "Failing to conserve charge in ionic equations.",
    ],
  },
  {
    topicCode: "C1.3",
    subjectCode: "CHEM",
    unitEn: "Basic Concepts and Calculations",
    titleEn: "Solution concentration and pH",
    titleZh: "溶液浓度与pH",
    summary:
      "Concentration measures solute per volume; pH is a logarithmic scale of hydrogen-ion concentration.",
    sections: [
      {
        heading: "Core idea",
        body: "Concentration c = n/V in mol/L. pH = −log[H⁺], so a change of one pH unit is a tenfold change in [H⁺].",
      },
      {
        heading: "How to solve it fast",
        body: "Convert mass to moles, divide by volume in litres, then take −log for pH.",
      },
    ],
    formulas: ["c = n/V", "pH = −log[H⁺]", "[H⁺] = 10^(−pH)"],
    traps: [
      "Using millilitres instead of litres.",
      "Treating pH as a linear scale.",
      "Confusing strong/weak with concentrated/dilute.",
    ],
    figureKey: "ph",
  },
  {
    topicCode: "C1.4",
    subjectCode: "CHEM",
    unitEn: "Basic Concepts and Calculations",
    titleEn: "Amount of substance",
    titleZh: "物质的量计算",
    summary:
      "The mole connects mass, particle count and gas volume through molar mass and Avogadro's number.",
    sections: [
      {
        heading: "Core idea",
        body: "One mole contains 6.02×10²³ particles and, for an ideal gas at STP, occupies about 22.4 L.",
      },
      {
        heading: "How to solve it fast",
        body: "Convert grams to moles with molar mass, then to particles or gas volume as needed.",
      },
    ],
    formulas: ["n = m/M", "N = n · N_A", "V = n · 22.4 L (STP)"],
    traps: [
      "Forgetting to sum molar masses for compounds.",
      "Using 22.4 L outside STP conditions.",
      "Mixing relative atomic mass with molar mass.",
    ],
  },
  {
    topicCode: "C1.5",
    subjectCode: "CHEM",
    unitEn: "Basic Concepts and Calculations",
    titleEn: "Ideal gas law applications",
    titleZh: "理想气体定律的应用",
    summary:
      "Ideal gases obey pV = nRT, linking moles, pressure, volume and temperature.",
    sections: [
      {
        heading: "Core idea",
        body: "Temperature must be in kelvin and R is 8.31 J/(mol·K). For a fixed amount of gas, pV/T stays constant.",
      },
      {
        heading: "How to solve it fast",
        body: "Rearrange for the unknown and keep units consistent before substituting.",
      },
    ],
    formulas: ["pV = nRT", "p₁V₁/T₁ = p₂V₂/T₂"],
    traps: [
      "Using degrees Celsius.",
      "Mixing pressure or volume units.",
      "Assuming ideal behaviour for condensable gases.",
    ],
  },
  {
    topicCode: "C2.1",
    subjectCode: "CHEM",
    unitEn: "Substance Properties and Reactions",
    titleEn: "Inorganic substances",
    titleZh: "无机物性质",
    summary:
      "Reactions of metals, non-metals, acids, bases and salts follow predictable patterns.",
    sections: [
      {
        heading: "Core idea",
        body: "Metal + acid gives a salt and hydrogen; acid + base gives a salt and water; metal oxide + acid gives a salt and water.",
      },
      {
        heading: "How to solve it fast",
        body: "Identify the class of each reactant, apply the standard reaction type, then balance the equation.",
      },
    ],
    formulas: [],
    traps: [
      "Misplacing hydrogen in the metal reactivity series.",
      "Forgetting that some bases and salts are insoluble.",
      "Assuming all metals react with water.",
    ],
  },
  {
    topicCode: "C2.2",
    subjectCode: "CHEM",
    unitEn: "Substance Properties and Reactions",
    titleEn: "Organic compounds",
    titleZh: "有机化合物",
    summary:
      "Organic chemistry covers hydrocarbons and functional groups such as alkenes, alcohols and carboxylic acids.",
    sections: [
      {
        heading: "Core idea",
        body: "Alkanes are saturated (single bonds); alkenes are unsaturated (C=C). Functional groups determine the reactions and properties of a molecule.",
      },
      {
        heading: "How to solve it fast",
        body: "Identify the functional group, then predict reactions: addition, substitution, oxidation or esterification.",
      },
    ],
    formulas: ["CₙH₂ₙ₊₂ (alkanes)", "CₙH₂ₙ (alkenes)"],
    traps: [
      "Confusing addition with substitution.",
      "Assuming every organic compound is a hydrocarbon.",
      "Ignoring isomerism.",
    ],
  },
  {
    topicCode: "C2.3",
    subjectCode: "CHEM",
    unitEn: "Substance Properties and Reactions",
    titleEn: "Oxidation–reduction reactions",
    titleZh: "氧化还原反应",
    summary:
      "Redox reactions transfer electrons: oxidation loses electrons, reduction gains them.",
    sections: [
      {
        heading: "Core idea",
        body: "Assign oxidation numbers; a change in oxidation number identifies oxidation and reduction. Balance by conserving electrons.",
      },
      {
        heading: "How to solve it fast",
        body: "Find oxidation states, balance the electrons in each half-reaction, then balance atoms and charge.",
      },
    ],
    formulas: ["oxidation number rules", "electron balance"],
    traps: [
      "Thinking oxidation always involves oxygen.",
      "Failing to balance electrons in half-reactions.",
      "Confusing the oxidising agent with the species oxidised.",
    ],
  },
  {
    topicCode: "C2.4",
    subjectCode: "CHEM",
    unitEn: "Substance Properties and Reactions",
    titleEn: "Ionic reactions and ion identification",
    titleZh: "离子反应与离子检验",
    summary:
      "Ions in solution react to form precipitates, gases or water; specific tests identify each ion.",
    sections: [
      {
        heading: "Core idea",
        body: "Solubility rules predict precipitates. Flame tests and reagent tests identify cations and anions.",
      },
      {
        heading: "How to solve it fast",
        body: "Write the ionic equation, remove spectator ions, and match the observation to the ion.",
      },
    ],
    formulas: ["net ionic equation"],
    traps: [
      "Including spectator ions in the net equation.",
      "Forgetting state symbols for precipitates.",
      "Mixing up flame-test colours.",
    ],
  },
  {
    topicCode: "C3.1",
    subjectCode: "CHEM",
    unitEn: "Chemical Theories and Laws",
    titleEn: "Atomic structure and periodic law",
    titleZh: "原子结构与元素周期律",
    summary:
      "Atoms have protons, neutrons and shell electrons; periodic trends follow electron configuration.",
    sections: [
      {
        heading: "Core idea",
        body: "Atomic number equals the number of protons. Across a period, nuclear charge rises and atomic radius falls; down a group, shells are added and radius grows.",
      },
      {
        heading: "How to solve it fast",
        body: "Use electron configuration to predict group, period, valency and reactivity trends.",
      },
    ],
    formulas: ["shell capacity 2, 8, 8 …"],
    traps: [
      "Confusing mass number with atomic number.",
      "Assuming atomic radius always increases across a period.",
      "Mixing up groups and periods.",
    ],
    figureKey: "atom",
  },
  {
    topicCode: "C3.2",
    subjectCode: "CHEM",
    unitEn: "Chemical Theories and Laws",
    titleEn: "Chemical bonds and intermolecular forces",
    titleZh: "化学键与分子间作用力",
    summary:
      "Ionic, covalent and metallic bonds hold substances together; weak intermolecular forces affect melting and boiling.",
    sections: [
      {
        heading: "Core idea",
        body: "Ionic bonds transfer electrons, covalent bonds share them, and metallic bonds share delocalised electrons.",
      },
      {
        heading: "How to solve it fast",
        body: "Use the electronegativity difference to classify bonding, then relate the structure to physical properties.",
      },
    ],
    formulas: [],
    traps: [
      "Confusing intramolecular bonds with intermolecular forces.",
      "Assuming covalent compounds never conduct electricity.",
      "Ignoring hydrogen bonding.",
    ],
  },
  {
    topicCode: "C3.3",
    subjectCode: "CHEM",
    unitEn: "Chemical Theories and Laws",
    titleEn: "Reaction rates and equilibrium",
    titleZh: "反应速率与化学平衡",
    summary:
      "Rates depend on concentration, temperature, surface area and catalysts; equilibrium is a dynamic balance.",
    sections: [
      {
        heading: "Core idea",
        body: "More concentration, temperature or surface area speeds a reaction; a catalyst lowers activation energy. Le Chatelier's principle predicts how an equilibrium shifts.",
      },
      {
        heading: "How to solve it fast",
        body: "Identify the change, then apply the rate factors or Le Chatelier to predict the response.",
      },
    ],
    formulas: ["rate = Δ[product]/Δt"],
    traps: [
      "Thinking a catalyst changes the equilibrium position.",
      "Confusing rate with yield.",
      "Assuming equilibrium means equal concentrations.",
    ],
    figureKey: "graph",
  },
  {
    topicCode: "C3.4",
    subjectCode: "CHEM",
    unitEn: "Chemical Theories and Laws",
    titleEn: "Electrolyte solutions",
    titleZh: "电解质溶液",
    summary:
      "Electrolytes ionise in water; acids, bases and salts conduct electricity through their ions.",
    sections: [
      {
        heading: "Core idea",
        body: "Strong electrolytes ionise fully; weak electrolytes do so partly. pH and conductivity depend on ion concentration.",
      },
      {
        heading: "How to solve it fast",
        body: "Classify strong versus weak, write the ionisation equation, and relate it to conductivity.",
      },
    ],
    formulas: ["pH = −log[H⁺]"],
    traps: [
      "Confusing strong with concentrated.",
      "Assuming every soluble salt is a strong acid.",
      "Forgetting water autoionisation.",
    ],
    figureKey: "ph",
  },
  {
    topicCode: "C4.1",
    subjectCode: "CHEM",
    unitEn: "Chemistry Experiments and Applications",
    titleEn: "Laboratory safety and instruments",
    titleZh: "实验安全与仪器操作",
    summary:
      "Correct apparatus, safety rules and measurement technique prevent errors and accidents.",
    sections: [
      {
        heading: "Core idea",
        body: "Use the right glassware for the job, read the meniscus at eye level, and never heat a closed system.",
      },
      {
        heading: "How to solve it fast",
        body: "Match the apparatus to the measurement and follow standard safety procedure.",
      },
    ],
    formulas: [],
    traps: [
      "Using a measuring cylinder when a burette or pipette is needed for precision.",
      "Reading the meniscus from above.",
      "Heating a sealed container.",
    ],
  },
  {
    topicCode: "C4.2",
    subjectCode: "CHEM",
    unitEn: "Chemistry Experiments and Applications",
    titleEn: "Gas preparation and identification",
    titleZh: "常见气体制备与检验",
    summary:
      "Gases are prepared by specific reactions and identified by simple tests.",
    sections: [
      {
        heading: "Core idea",
        body: "Hydrogen pops with a lighted splint; oxygen relights a glowing splint; carbon dioxide turns limewater milky; ammonia turns damp red litmus blue.",
      },
      {
        heading: "How to solve it fast",
        body: "Choose the reagent, collect the gas appropriately, then confirm it with the standard test.",
      },
    ],
    formulas: [],
    traps: [
      "Confusing carbon dioxide and sulfur dioxide tests.",
      "Collecting a gas in the wrong container.",
      "Forgetting to dry the gas.",
    ],
  },
  {
    topicCode: "C4.3",
    subjectCode: "CHEM",
    unitEn: "Chemistry Experiments and Applications",
    titleEn: "Separation and purification",
    titleZh: "物质的分离与提纯",
    summary:
      "Mixtures are separated by filtration, distillation, crystallisation, chromatography or extraction.",
    sections: [
      {
        heading: "Core idea",
        body: "Choose the method based on the property difference: solubility, boiling point, particle size or adsorption.",
      },
      {
        heading: "How to solve it fast",
        body: "Match the method to the physical difference and name the apparatus.",
      },
    ],
    formulas: ["R_f = distance moved by solute / distance moved by solvent"],
    traps: [
      "Using filtration to separate a dissolved solid.",
      "Choosing simple distillation for dissolved gases.",
      "Ignoring solubility differences.",
    ],
  },
  {
    topicCode: "C4.4",
    subjectCode: "CHEM",
    unitEn: "Chemistry Experiments and Applications",
    titleEn: "Industrial chemical processes",
    titleZh: "化工流程分析",
    summary:
      "Industrial processes balance raw materials, energy, yield and environmental cost.",
    sections: [
      {
        heading: "Core idea",
        body: "The Haber process, the Contact process and electrolysis are common. Conditions are chosen to balance yield and rate.",
      },
      {
        heading: "How to solve it fast",
        body: "Read the flow diagram, identify inputs, outputs and recycling loops, and evaluate the conditions.",
      },
    ],
    formulas: [],
    traps: [
      "Ignoring recycling loops in a flow chart.",
      "Confusing a catalyst with a reactant.",
      "Overlooking environmental by-products.",
    ],
  },

  /* ─────────────────────── Professional Chinese ─────────────────────── */
  {
    topicCode: "H1",
    subjectCode: "CH_HUM",
    unitEn: "Language Items",
    titleEn: "Gap filling with word selection",
    titleZh: "选词填空",
    summary:
      "Choose the word that fits the sentence by meaning, grammar and collocation. 注意词性、搭配与语境。",
    sections: [
      {
        heading: "核心方法",
        body: "先读全句抓语境，再比较选项的词义、词性和搭配。固定搭配与语体（书面/口语）往往是判断依据。",
      },
      {
        heading: "答题步骤",
        body: "先排除明显不符的选项，再把剩余词语代入原句通读，检查语义与语法是否通顺。",
      },
    ],
    formulas: ["看词性：名/动/形/副", "看搭配：固定词组优先", "看语境：前后逻辑一致"],
    traps: ["只看词义忽略词性", "被近义词干扰，忽略固定搭配", "忽视句子的感情色彩"],
  },
  {
    topicCode: "H2",
    subjectCode: "CH_HUM",
    unitEn: "Language Items",
    titleEn: "Paragraph completion with word selection",
    titleZh: "选词成段",
    summary:
      "Fill a paragraph with words so the whole passage stays coherent. 先通读，再逐空。",
    sections: [
      {
        heading: "核心方法",
        body: "先通读全段，把握主题与逻辑关系（转折、因果、并列），再逐空选词。上下文的代词和复指是重要线索。",
      },
      {
        heading: "答题步骤",
        body: "用连接词、重复信息和语义场定位答案，最后通读整段检查连贯性。",
      },
    ],
    formulas: ["先通读，后填空", "抓逻辑连接词", "利用上下文人称与复指"],
    traps: ["逐空孤立判断", "忽略段落主题", "填完不做最后通读"],
  },
  {
    topicCode: "H3",
    subjectCode: "CH_HUM",
    unitEn: "Reading",
    titleEn: "Reading comprehension",
    titleZh: "阅读理解",
    summary:
      "Answer questions about a Chinese passage: main idea, detail, inference and vocabulary in context.",
    sections: [
      {
        heading: "核心方法",
        body: "先看题目再读文章，定位关键词句。主旨题看首尾段，细节题回原文找对应，词义题看上下文。",
      },
      {
        heading: "答题步骤",
        body: "排除与原文矛盾或过度推断的选项，选择最贴合原文的一项。",
      },
    ],
    formulas: ["主旨看首尾", "细节回原文", "词义看上下文", "排除绝对化选项"],
    traps: ["凭常识而非原文作答", "把推断当成事实", "忽略时间与数量限定词"],
  },
  {
    topicCode: "S1",
    subjectCode: "CH_SCI",
    unitEn: "Language Items",
    titleEn: "Gap filling with word selection (STEM)",
    titleZh: "选词填空（理科）",
    summary:
      "Fill gaps in science-related Chinese sentences using the correct term and collocation. 术语搭配是重点。",
    sections: [
      {
        heading: "核心方法",
        body: "结合数理化术语与语法判断最合适的词。专业术语的固定搭配和量词、单位是关键。",
      },
      {
        heading: "答题步骤",
        body: "先看句子涉及的学科概念，再比较选项的术语准确性与词性，代入检验。",
      },
    ],
    formulas: ["术语搭配要准确", "注意量词与单位", "保持词性一致"],
    traps: ["用近义词替换专业术语", "忽略单位与量词", "只看字面意思"],
  },
  {
    topicCode: "S2",
    subjectCode: "CH_SCI",
    unitEn: "Language Items",
    titleEn: "Paragraph completion with word selection (STEM)",
    titleZh: "选词成段（理科）",
    summary:
      "Complete a science passage coherently, keeping terminology and logic consistent. 把握说明文逻辑。",
    sections: [
      {
        heading: "核心方法",
        body: "说明文通常按定义、解释、例证的顺序展开。先把握逻辑主线，再逐空选择。",
      },
      {
        heading: "答题步骤",
        body: "利用术语复现和因果连接词定位答案，最后通读核对术语与逻辑是否一致。",
      },
    ],
    formulas: ["说明文重定义与因果", "术语前后一致", "最后通读"],
    traps: ["破坏术语一致性", "忽略因果链条", "逐空孤立选择"],
  },
  {
    topicCode: "S3",
    subjectCode: "CH_SCI",
    unitEn: "Reading",
    titleEn: "Reading comprehension (STEM)",
    titleZh: "阅读理解（理科）",
    summary:
      "Read scientific Chinese passages and answer detail, inference and terminology questions.",
    sections: [
      {
        heading: "核心方法",
        body: "定位数据、实验步骤和结论。术语题看上下文定义，数据题回原文核对数字与条件。",
      },
      {
        heading: "答题步骤",
        body: "排除夸大或无依据的选项，选择与原文信息最一致的一项。",
      },
    ],
    formulas: ["数据题回原文", "术语看定义句", "结论看首尾", "排除无依据选项"],
    traps: ["混淆实验条件", "把可能当成必然", "忽略否定词"],
  },
];
