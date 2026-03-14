import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Shield, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="h-4 w-4" />
            <span>Powering Next-Gen Accounts Payable</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Intelligent Invoice <br />
            <span className="text-blue-600 dark:text-blue-500">Processing with AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate manual data entry and human error. Our AI agents process invoices, 
            validate against POs, and flag risks in real-time with 99.9% accuracy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full transition-all hover:bg-accent">
              View Case Study
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for speed, accuracy, and security. Everything you need to automate your AP workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-background border transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Extract line items, tax details, and vendor info in milliseconds. No more manual data entry.
              </p>
              <ul className="mt-6 space-y-2">
                {['Multi-format OCR', '99.9% Extraction Accuracy', 'Real-time validation'].map((item) => (
                  <li key={item} className="flex items-center text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative p-8 rounded-2xl bg-background border transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fraud Prevention</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced anomaly detection identifies duplicate invoices, vendor mismatches, and potential fraud.
              </p>
              <ul className="mt-6 space-y-2">
                {['Pattern Recognition', 'Vendor Verification', 'Compliance Checks'].map((item) => (
                  <li key={item} className="flex items-center text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative p-8 rounded-2xl bg-background border transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Actionable Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gain visibility into your spending patterns with real-time confidence scores and analytics.
              </p>
              <ul className="mt-6 space-y-2">
                {['Spend Categorization', 'Audit Readiness', 'Cash Flow Forecasts'].map((item) => (
                  <li key={item} className="flex items-center text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
