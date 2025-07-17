
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Admin Account erstellen
  const adminPassword = await bcrypt.hash('ABBerlin2025', 12);
  
  const admin = await prisma.user.upsert({
    where: { 
      id: '00000000-0000-0000-0000-000000000000' 
    },
    update: {
      email: 'admin@immorechner.de',
      vorname: 'Admin',
      nachname: 'Admin',
      passwort: adminPassword,
      isAdmin: true,
    },
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'admin@immorechner.de',
      vorname: 'Admin',
      nachname: 'Admin',
      passwort: adminPassword,
      isAdmin: true,
    },
  });

  console.log('Admin user created:', admin.email);

  // Test Account erstellen (entsprechend der Anforderung)
  const testPassword = await bcrypt.hash('johndoe123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { 
      email: 'john@doe.com' 
    },
    update: {
      email: 'john@doe.com',
      vorname: 'John',
      nachname: 'Doe',
      passwort: testPassword,
      isAdmin: false,
    },
    create: {
      email: 'john@doe.com',
      vorname: 'John',
      nachname: 'Doe',
      passwort: testPassword,
      isAdmin: false,
    },
  });

  console.log('Test user created:', testUser.email);

  // Beispiel-Berechnung für Test-User
  const exampleCalculation = await prisma.calculation.create({
    data: {
      userId: testUser.id,
      name: 'Beispiel Wohnung Berlin',
      adresse: 'Konrad Wolf Strasse 8',
      etage: '2. OG',
      wohnflaeche: 67.29,
      stellplatz: '-',
      wohnungsnummer: '4',
      kaufpreis_wohnung: 380700,
      kaufpreis_stellplatz: 0,
      grundstuecksanteil_prozent: 15,
      makler_prozent: 0,
      notar_prozent: 1.5,
      grundbuch_prozent: 0.5,
      grunderwerbsteuer_prozent: 6.0,
      sonstige_prozent: 0,
      eigenkapital: 80000,
      realkredit_zinssatz: 3.8,
      realkredit_tilgung: 1.5,
      realkredit_zinsbindung: 10,
      foerderdarlehen: 0,
      foerderung_zinssatz: 0,
      foerderung_tilgung: 0,
      foerderung_zinsbindung: 0,
      kaltmiete_pro_qm: 14,
      stellplatz_miete_monatlich: 0,
      sonstige_mieteinnahmen: 0,
      hausgeld_umlagefaehig: 250,
      hausgeld_nicht_umlagefaehig: 30,
      instandhaltungsruecklage: 0,
      sonstige_bewirtschaftung: 0,
      zu_versteuerndes_einkommen: 100000,
      steuersatz: 0.42,
      abschreibung_prozent: 0.09,
    },
  });

  console.log('Example calculation created:', exampleCalculation.name);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
