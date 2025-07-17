
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, FileText, Shield, Users, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Immobilien Rendite Rechner</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/login">
              <Button variant="ghost">Anmelden</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Registrieren</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Professionelle <span className="text-blue-600">Immobilien-Rendite</span> Berechnung
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Analysieren Sie Ihre Immobilien-Investition mit unserem fortschrittlichen Rendite-Rechner. 
                Über 50 Berechnungsformeln für präzise Ergebnisse und fundierte Entscheidungen.
              </p>
              <div className="flex space-x-4">
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Jetzt kostenlos starten
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Bereits registriert?
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e0b8430767291.5631d128aa375.jpg"
                  alt="Moderne Wohnanlage mit Finanzanalyse"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum unser Rendite-Rechner?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unser Tool basiert auf bewährten Immobilien-Berechnungsmodellen und bietet Ihnen 
              eine umfassende Analyse Ihrer Investition mit allen relevanten Kennzahlen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Präzise Berechnungen</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Über 50 professionelle Berechnungsformeln für Cashflow, Rendite, 
                  Steuerersparnisse und Finanzierungsanalyse.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">PDF-Export</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Exportieren Sie Ihre Berechnungen als professionellen PDF-Report 
                  mit allen Kennzahlen und Grafiken.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Grafische Auswertung</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Visualisierung der Rendite-Entwicklung über die Finanzierungszeit 
                  mit interaktiven Diagrammen.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So funktioniert's
            </h2>
            <p className="text-xl text-gray-600">
              In nur wenigen Schritten zu Ihrer professionellen Immobilien-Analyse
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Objektdaten eingeben</h3>
                    <p className="text-gray-600">
                      Geben Sie alle relevanten Daten zu Ihrer Immobilie ein: Kaufpreis, 
                      Wohnfläche, Nebenkosten und Finanzierungsdetails.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Automatische Berechnung</h3>
                    <p className="text-gray-600">
                      Unser System berechnet automatisch alle relevanten Kennzahlen: 
                      Rendite, Cashflow, Steuereffekte und mehr.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ergebnisse analysieren</h3>
                    <p className="text-gray-600">
                      Analysieren Sie die Ergebnisse in übersichtlichen Grafiken und 
                      exportieren Sie den Report als PDF.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://www.scatterpie.io/wp-scatterpie/wp-content/uploads/2023/09/Group-29_PropertyListing.png"
                  alt="Immobilien-Rechner Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Alle wichtigen Funktionen
            </h2>
            <p className="text-xl text-gray-600">
              Professionelle Immobilien-Analyse mit allen relevanten Kennzahlen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <Calculator className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Umfassende Berechnung</h3>
              <p className="text-gray-600">
                27 Eingabefelder für detaillierte Objektdaten, Finanzierung und Steuerparameter
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto bg-green-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rendite-Analyse</h3>
              <p className="text-gray-600">
                Eigenkapitalrendite, Bruttomietrendite, Kaufpreisfaktor und Cashflow-Analyse
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto bg-purple-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Steueroptimierung</h3>
              <p className="text-gray-600">
                Detaillierte Steuerberechnungen mit Abschreibungen und Steuerersparnissen
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto bg-orange-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Benutzerverwaltung</h3>
              <p className="text-gray-600">
                Sichere Speicherung Ihrer Berechnungen mit persönlichem Benutzer-Account
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto bg-red-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <FileText className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF-Export</h3>
              <p className="text-gray-600">
                Professionelle PDF-Reports mit allen Berechnungen und Grafiken
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto bg-indigo-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <BarChart3 className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grafische Auswertung</h3>
              <p className="text-gray-600">
                Interaktive Diagramme zur Visualisierung der Rendite-Entwicklung
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Bereit für Ihre Immobilien-Analyse?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Starten Sie jetzt und erhalten Sie eine professionelle Rendite-Berechnung 
            für Ihre Immobilien-Investition.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Kostenlos registrieren
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Bereits Kunde? Anmelden
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Immobilien Rendite Rechner</span>
              </div>
              <p className="text-gray-400">
                Professionelle Immobilien-Rendite-Berechnung für fundierte Investitionsentscheidungen.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Funktionen</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Rendite-Berechnung</li>
                <li>Cashflow-Analyse</li>
                <li>Steueroptimierung</li>
                <li>PDF-Export</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Hilfe & FAQ</li>
                <li>Benutzerhandbuch</li>
                <li>Kontakt</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Immobilien Rendite Rechner. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
