
export interface CalculationInput {
  // Objektdaten
  adresse?: string;
  etage?: string;
  wohnflaeche: number;
  stellplatz?: string;
  wohnungsnummer?: string;
  
  // Kaufpreise
  kaufpreis_wohnung: number;
  kaufpreis_stellplatz: number;
  grundstuecksanteil_prozent: number;
  
  // Kaufnebenkosten (in %)
  makler_prozent: number;
  notar_prozent: number;
  grundbuch_prozent: number;
  grunderwerbsteuer_prozent: number;
  sonstige_prozent: number;
  
  // Finanzierung
  eigenkapital: number;
  realkredit_zinssatz: number;
  realkredit_tilgung: number;
  realkredit_zinsbindung: number;
  foerderdarlehen: number;
  foerderung_zinssatz: number;
  foerderung_tilgung: number;
  foerderung_zinsbindung: number;
  
  // Mieteinnahmen
  kaltmiete_pro_qm: number;
  stellplatz_miete_monatlich: number;
  sonstige_mieteinnahmen: number;
  
  // Bewirtschaftungskosten (monatlich)
  hausgeld_umlagefaehig: number;
  hausgeld_nicht_umlagefaehig: number;
  instandhaltungsruecklage: number;
  sonstige_bewirtschaftung: number;
  
  // Steuerliche Parameter
  zu_versteuerndes_einkommen: number;
  steuersatz: number;
  abschreibung_prozent: number;
}

export interface CalculationResult {
  grunddaten: {
    kaufpreis_pro_qm: number;
    grundstuecksanteil_absolut: number;
    gesamtkaufpreis: number;
    summe_kaufnebenkosten_prozent: number;
    summe_kaufnebenkosten_absolut: number;
    gesamtinvestitionskosten: number;
  };
  
  finanzierung: {
    finanzierungsbedarf: number;
    realkredit_zinsen_jaehrlich: number;
    realkredit_zinsen_monatlich: number;
    realkredit_tilgung_jaehrlich: number;
    realkredit_tilgung_monatlich: number;
    realkredit_bruttorate_prozent: number;
    realkredit_bruttorate_jaehrlich: number;
    realkredit_bruttorate_monatlich: number;
    foerder_zinsen_jaehrlich: number;
    foerder_tilgung_jaehrlich: number;
    foerder_bruttorate_jaehrlich: number;
    foerder_bruttorate_monatlich: number;
    gesamt_finanzierungsbelastung_monatlich: number;
    gesamt_finanzierungsbelastung_jaehrlich: number;
  };
  
  mieteinnahmen: {
    kaltmiete_wohnung_monatlich: number;
    kaltmiete_wohnung_jaehrlich: number;
    miete_stellplatz_jaehrlich: number;
    umlagefaehige_kosten_pro_qm: number;
    umlagefaehige_kosten_jaehrlich: number;
    gesamtmiete_monatlich: number;
    gesamtmiete_jaehrlich: number;
    summe_mieteinnahmen_steuer: number;
    nettomiete_jaehrlich: number;
  };
  
  bewirtschaftung: {
    hausgeld_umlagefaehig_pro_qm: number;
    hausgeld_nicht_umlagefaehig_pro_qm: number;
    hausgeld_umlagefaehig_jaehrlich: number;
    hausgeld_nicht_umlagefaehig_jaehrlich: number;
    instandhaltungsruecklage_jaehrlich: number;
    sonstige_bewirtschaftung_jaehrlich: number;
    bewirtschaftungskosten_monatlich: number;
    bewirtschaftungskosten_jaehrlich: number;
    bewirtschaftungskosten_pro_qm: number;
  };
  
  steuer: {
    herstellungskosten_neubau: number;
    grunderwerbsteuer_gebaeude: number;
    bemessungsgrundlage: number;
    abschreibung_jaehrlich: number;
    zinsen_steuer_jaehrlich: number;
    verwalter_instandhaltung_jaehrlich: number;
    steuerlicher_aufwand: number;
    ergebnis_vv: number;
    neues_zu_versteuerndes_einkommen: number;
    neue_steuerlast: number;
    alte_steuerlast: number;
    steuererstattung: number;
  };
  
  cashflow: {
    cashflow_vor_steuer_jaehrlich: number;
    cashflow_vor_steuer_monatlich: number;
    cashflow_nach_steuer_jaehrlich: number;
    cashflow_nach_steuer_monatlich: number;
  };
  
  rendite: {
    jahresreinertrag: number;
    eigenkapitalrendite: number;
    bruttomietrendite: number;
    kaufpreisfaktor: number;
  };
  
  kaufnebenkosten_detail: {
    makler_absolut: number;
    notar_absolut: number;
    grundbuch_absolut: number;
    grunderwerbsteuer_absolut: number;
    sonstige_absolut: number;
  };
}

export function calculateImmobilienRendite(input: CalculationInput): CalculationResult {
  // 1. Grundberechnungen
  const grundstuecksanteil_absolut = ((input.kaufpreis_wohnung + input.kaufpreis_stellplatz) * input.grundstuecksanteil_prozent) / 100;
  const kaufpreis_pro_qm = input.kaufpreis_wohnung / input.wohnflaeche;
  const gesamtkaufpreis = input.kaufpreis_wohnung + input.kaufpreis_stellplatz;
  
  // Kaufnebenkosten absolut
  const makler_absolut = (gesamtkaufpreis * input.makler_prozent) / 100;
  const notar_absolut = (gesamtkaufpreis * input.notar_prozent) / 100;
  const grundbuch_absolut = (gesamtkaufpreis * input.grundbuch_prozent) / 100;
  const grunderwerbsteuer_absolut = (gesamtkaufpreis * input.grunderwerbsteuer_prozent) / 100;
  const sonstige_absolut = (gesamtkaufpreis * input.sonstige_prozent) / 100;
  
  const summe_kaufnebenkosten_prozent = input.makler_prozent + input.notar_prozent + input.grundbuch_prozent + input.grunderwerbsteuer_prozent + input.sonstige_prozent;
  const summe_kaufnebenkosten_absolut = (gesamtkaufpreis * summe_kaufnebenkosten_prozent) / 100;
  const gesamtinvestitionskosten = gesamtkaufpreis + summe_kaufnebenkosten_absolut;
  
  // 2. Finanzierungsberechnungen
  const finanzierungsbedarf = gesamtinvestitionskosten - input.eigenkapital - input.foerderdarlehen;
  
  // Realkredit
  const realkredit_zinsen_jaehrlich = finanzierungsbedarf * (input.realkredit_zinssatz / 100);
  const realkredit_zinsen_monatlich = realkredit_zinsen_jaehrlich / 12;
  const realkredit_tilgung_jaehrlich = finanzierungsbedarf * (input.realkredit_tilgung / 100);
  const realkredit_tilgung_monatlich = realkredit_tilgung_jaehrlich / 12;
  const realkredit_bruttorate_prozent = input.realkredit_tilgung + input.realkredit_zinssatz;
  const realkredit_bruttorate_jaehrlich = realkredit_tilgung_jaehrlich + realkredit_zinsen_jaehrlich;
  const realkredit_bruttorate_monatlich = realkredit_bruttorate_jaehrlich / 12;
  
  // Förderkredit
  const foerder_zinsen_jaehrlich = input.foerderdarlehen * (input.foerderung_zinssatz / 100);
  const foerder_tilgung_jaehrlich = input.foerderdarlehen * (input.foerderung_tilgung / 100);
  const foerder_bruttorate_jaehrlich = foerder_tilgung_jaehrlich + foerder_zinsen_jaehrlich;
  const foerder_bruttorate_monatlich = foerder_bruttorate_jaehrlich / 12;
  
  // Gesamte Finanzierungsbelastung
  const gesamt_finanzierungsbelastung_monatlich = realkredit_bruttorate_monatlich + foerder_bruttorate_monatlich;
  const gesamt_finanzierungsbelastung_jaehrlich = gesamt_finanzierungsbelastung_monatlich * 12;
  
  // 3. Mieteinnahmen-Berechnungen
  const kaltmiete_wohnung_monatlich = input.kaltmiete_pro_qm * input.wohnflaeche;
  const kaltmiete_wohnung_jaehrlich = kaltmiete_wohnung_monatlich * 12;
  const miete_stellplatz_jaehrlich = input.stellplatz_miete_monatlich * 12;
  const umlagefaehige_kosten_pro_qm = input.hausgeld_umlagefaehig / input.wohnflaeche;
  const umlagefaehige_kosten_jaehrlich = input.hausgeld_umlagefaehig * 12;
  const gesamtmiete_monatlich = kaltmiete_wohnung_monatlich + input.stellplatz_miete_monatlich + input.hausgeld_umlagefaehig + input.sonstige_mieteinnahmen;
  const gesamtmiete_jaehrlich = gesamtmiete_monatlich * 12;
  const summe_mieteinnahmen_steuer = kaltmiete_wohnung_jaehrlich + miete_stellplatz_jaehrlich;
  const nettomiete_jaehrlich = (kaltmiete_wohnung_monatlich + input.stellplatz_miete_monatlich) * 12;
  
  // 4. Bewirtschaftungskosten-Berechnungen
  const hausgeld_umlagefaehig_pro_qm = input.hausgeld_umlagefaehig / input.wohnflaeche;
  const hausgeld_nicht_umlagefaehig_pro_qm = input.hausgeld_nicht_umlagefaehig / input.wohnflaeche;
  const hausgeld_umlagefaehig_jaehrlich = input.hausgeld_umlagefaehig * 12;
  const hausgeld_nicht_umlagefaehig_jaehrlich = input.hausgeld_nicht_umlagefaehig * 12;
  const instandhaltungsruecklage_jaehrlich = input.instandhaltungsruecklage * 12;
  const sonstige_bewirtschaftung_jaehrlich = input.sonstige_bewirtschaftung * 12;
  const bewirtschaftungskosten_monatlich = input.hausgeld_umlagefaehig + input.hausgeld_nicht_umlagefaehig + input.instandhaltungsruecklage + input.sonstige_bewirtschaftung;
  const bewirtschaftungskosten_jaehrlich = bewirtschaftungskosten_monatlich * 12;
  const bewirtschaftungskosten_pro_qm = bewirtschaftungskosten_monatlich / input.wohnflaeche;
  
  // 5. Steuerliche Berechnungen
  const herstellungskosten_neubau = (input.kaufpreis_wohnung + input.kaufpreis_stellplatz) - grundstuecksanteil_absolut;
  const grunderwerbsteuer_gebaeude = herstellungskosten_neubau * (input.grunderwerbsteuer_prozent / 100);
  const bemessungsgrundlage = herstellungskosten_neubau + grunderwerbsteuer_gebaeude + notar_absolut + grundbuch_absolut;
  const abschreibung_jaehrlich = bemessungsgrundlage * input.abschreibung_prozent;
  const zinsen_steuer_jaehrlich = realkredit_zinsen_jaehrlich + foerder_zinsen_jaehrlich;
  const verwalter_instandhaltung_jaehrlich = input.hausgeld_nicht_umlagefaehig * 12;
  const steuerlicher_aufwand = abschreibung_jaehrlich + zinsen_steuer_jaehrlich + verwalter_instandhaltung_jaehrlich;
  const ergebnis_vv = summe_mieteinnahmen_steuer - steuerlicher_aufwand;
  const neues_zu_versteuerndes_einkommen = input.zu_versteuerndes_einkommen + ergebnis_vv;
  const neue_steuerlast = neues_zu_versteuerndes_einkommen * input.steuersatz;
  const alte_steuerlast = input.zu_versteuerndes_einkommen * input.steuersatz;
  const steuererstattung = alte_steuerlast - neue_steuerlast;
  
  // 6. Cashflow-Berechnungen
  const cashflow_vor_steuer_jaehrlich = summe_mieteinnahmen_steuer - (realkredit_bruttorate_jaehrlich + foerder_bruttorate_jaehrlich + verwalter_instandhaltung_jaehrlich);
  const cashflow_vor_steuer_monatlich = cashflow_vor_steuer_jaehrlich / 12;
  const cashflow_nach_steuer_jaehrlich = cashflow_vor_steuer_jaehrlich + steuererstattung;
  const cashflow_nach_steuer_monatlich = cashflow_nach_steuer_jaehrlich / 12;
  
  // 7. Rendite-Berechnungen
  const jahresreinertrag = summe_mieteinnahmen_steuer - zinsen_steuer_jaehrlich - verwalter_instandhaltung_jaehrlich;
  const eigenkapitalrendite = input.eigenkapital > 0 ? (jahresreinertrag / input.eigenkapital) * 100 : 0;
  const bruttomietrendite = gesamtkaufpreis > 0 ? (nettomiete_jaehrlich / gesamtkaufpreis) * 100 : 0;
  const kaufpreisfaktor = nettomiete_jaehrlich > 0 ? gesamtkaufpreis / nettomiete_jaehrlich : 0;
  
  return {
    grunddaten: {
      kaufpreis_pro_qm,
      grundstuecksanteil_absolut,
      gesamtkaufpreis,
      summe_kaufnebenkosten_prozent,
      summe_kaufnebenkosten_absolut,
      gesamtinvestitionskosten,
    },
    finanzierung: {
      finanzierungsbedarf,
      realkredit_zinsen_jaehrlich,
      realkredit_zinsen_monatlich,
      realkredit_tilgung_jaehrlich,
      realkredit_tilgung_monatlich,
      realkredit_bruttorate_prozent,
      realkredit_bruttorate_jaehrlich,
      realkredit_bruttorate_monatlich,
      foerder_zinsen_jaehrlich,
      foerder_tilgung_jaehrlich,
      foerder_bruttorate_jaehrlich,
      foerder_bruttorate_monatlich,
      gesamt_finanzierungsbelastung_monatlich,
      gesamt_finanzierungsbelastung_jaehrlich,
    },
    mieteinnahmen: {
      kaltmiete_wohnung_monatlich,
      kaltmiete_wohnung_jaehrlich,
      miete_stellplatz_jaehrlich,
      umlagefaehige_kosten_pro_qm,
      umlagefaehige_kosten_jaehrlich,
      gesamtmiete_monatlich,
      gesamtmiete_jaehrlich,
      summe_mieteinnahmen_steuer,
      nettomiete_jaehrlich,
    },
    bewirtschaftung: {
      hausgeld_umlagefaehig_pro_qm,
      hausgeld_nicht_umlagefaehig_pro_qm,
      hausgeld_umlagefaehig_jaehrlich,
      hausgeld_nicht_umlagefaehig_jaehrlich,
      instandhaltungsruecklage_jaehrlich,
      sonstige_bewirtschaftung_jaehrlich,
      bewirtschaftungskosten_monatlich,
      bewirtschaftungskosten_jaehrlich,
      bewirtschaftungskosten_pro_qm,
    },
    steuer: {
      herstellungskosten_neubau,
      grunderwerbsteuer_gebaeude,
      bemessungsgrundlage,
      abschreibung_jaehrlich,
      zinsen_steuer_jaehrlich,
      verwalter_instandhaltung_jaehrlich,
      steuerlicher_aufwand,
      ergebnis_vv,
      neues_zu_versteuerndes_einkommen,
      neue_steuerlast,
      alte_steuerlast,
      steuererstattung,
    },
    cashflow: {
      cashflow_vor_steuer_jaehrlich,
      cashflow_vor_steuer_monatlich,
      cashflow_nach_steuer_jaehrlich,
      cashflow_nach_steuer_monatlich,
    },
    rendite: {
      jahresreinertrag,
      eigenkapitalrendite,
      bruttomietrendite,
      kaufpreisfaktor,
    },
    kaufnebenkosten_detail: {
      makler_absolut,
      notar_absolut,
      grundbuch_absolut,
      grunderwerbsteuer_absolut,
      sonstige_absolut,
    },
  };
}

// Helper function to generate ROI development over time
export function generateROITimeline(input: CalculationInput, years: number = 20): Array<{year: number, roi: number, cashflow: number}> {
  const result = calculateImmobilienRendite(input);
  const timeline = [];
  
  for (let year = 1; year <= years; year++) {
    // Vereinfachte Annahme: konstante Werte über die Zeit
    // In der Realität würden hier komplexere Berechnungen stattfinden
    const roi = result.rendite.eigenkapitalrendite;
    const cashflow = result.cashflow.cashflow_nach_steuer_jaehrlich;
    
    timeline.push({
      year,
      roi,
      cashflow
    });
  }
  
  return timeline;
}

// Validation functions
export function validateCalculationInput(input: Partial<CalculationInput>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Pflichtfelder
  if (!input.wohnflaeche || input.wohnflaeche <= 0) {
    errors.push('Wohnfläche muss größer als 0 sein');
  }
  
  if (!input.kaufpreis_wohnung || input.kaufpreis_wohnung <= 0) {
    errors.push('Kaufpreis Wohnung muss größer als 0 sein');
  }
  
  if (input.eigenkapital === undefined || input.eigenkapital < 0) {
    errors.push('Eigenkapital muss >= 0 sein');
  }
  
  if (!input.kaltmiete_pro_qm || input.kaltmiete_pro_qm <= 0) {
    errors.push('Kaltmiete pro m² muss größer als 0 sein');
  }
  
  // Bereichsvalidierungen
  if (input.makler_prozent !== undefined && (input.makler_prozent < 0 || input.makler_prozent > 100)) {
    errors.push('Makler-Prozentsatz muss zwischen 0 und 100 liegen');
  }
  
  if (input.realkredit_zinssatz !== undefined && (input.realkredit_zinssatz < 0 || input.realkredit_zinssatz > 20)) {
    errors.push('Realkredit-Zinssatz muss zwischen 0 und 20% liegen');
  }
  
  if (input.realkredit_tilgung !== undefined && (input.realkredit_tilgung < 0 || input.realkredit_tilgung > 10)) {
    errors.push('Realkredit-Tilgung muss zwischen 0 und 10% liegen');
  }
  
  if (input.steuersatz !== undefined && (input.steuersatz < 0 || input.steuersatz > 1)) {
    errors.push('Steuersatz muss zwischen 0 und 1 liegen');
  }
  
  // Logische Validierungen
  if (input.eigenkapital !== undefined && input.foerderdarlehen !== undefined && input.kaufpreis_wohnung !== undefined) {
    const geschaetzteGesamtkosten = input.kaufpreis_wohnung * 1.1; // Grobe Schätzung mit Nebenkosten
    if (input.eigenkapital + input.foerderdarlehen > geschaetzteGesamtkosten) {
      errors.push('Eigenkapital + Förderdarlehen sollten nicht höher als die Gesamtkosten sein');
    }
  }
  
  if (input.foerderdarlehen !== undefined && input.foerderdarlehen > 0) {
    if (input.foerderung_zinssatz === undefined || input.foerderung_zinssatz === 0) {
      errors.push('Bei Förderdarlehen muss ein Zinssatz angegeben werden');
    }
    if (input.foerderung_tilgung === undefined || input.foerderung_tilgung === 0) {
      errors.push('Bei Förderdarlehen muss eine Tilgung angegeben werden');
    }
  }
  
  // Warnung für unrealistischen Grundstücksanteil
  if (input.grundstuecksanteil_prozent !== undefined && (input.grundstuecksanteil_prozent < 10 || input.grundstuecksanteil_prozent > 30)) {
    errors.push('Warnung: Grundstücksanteil sollte zwischen 10-30% liegen');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
