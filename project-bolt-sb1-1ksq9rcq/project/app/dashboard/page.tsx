'use client';

import { useState } from 'react';
import { Upload, CircleCheck as CheckCircle2, Circle, Loader as Loader2, TriangleAlert as AlertTriangle, FileText, DollarSign, Building2, Calendar, ThumbsUp, ThumbsDown, Clock, Search, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface AgentStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface RiskFlag {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  icon: any;
}

export default function InvoiceDashboard() {
  const [notes, setNotes] = useState('');
  const [dragActive, setDragActive] = useState<'invoice' | 'po' | null>(null);

  const agentSteps: AgentStep[] = [
    { id: '1', label: 'Document Upload', status: 'completed' },
    { id: '2', label: 'Extracting Data', status: 'completed' },
    { id: '3', label: 'Cross-checking PO', status: 'completed' },
    { id: '4', label: 'Scoring Risk', status: 'active' },
    { id: '5', label: 'Awaiting Review', status: 'pending' },
    { id: '6', label: 'Payment Processing', status: 'pending' },
  ];

  const riskFlags: RiskFlag[] = [
    {
      id: '1',
      severity: 'high',
      message: 'Price mismatch on Item 3: Invoice shows $2,450, PO shows $2,200',
      icon: DollarSign,
    },
    {
      id: '2',
      severity: 'high',
      message: 'Supplier "Acme Industrial Co." not found in ERP system',
      icon: Building2,
    },
    {
      id: '3',
      severity: 'medium',
      message: 'Invoice date is 45 days old - outside standard 30-day window',
      icon: Calendar,
    },
    {
      id: '4',
      severity: 'medium',
      message: 'Payment terms differ: Invoice NET-45, PO shows NET-30',
      icon: FileText,
    },
  ];

  const extractedData = {
    invoice_number: 'INV-2024-003421',
    supplier: 'Acme Industrial Co.',
    invoice_date: '2024-01-15',
    due_date: '2024-03-01',
    total_amount: 12450.0,
    currency: 'USD',
    payment_terms: 'NET-45',
    line_items: [
      { description: 'Industrial Bearings (Type A)', quantity: 100, unit_price: 45.0, total: 4500.0 },
      { description: 'Hydraulic Seals Kit', quantity: 25, unit_price: 120.0, total: 3000.0 },
      { description: 'Premium Lubricant (5L)', quantity: 50, unit_price: 99.0, total: 4950.0 },
    ],
  };

  const handleDrag = (e: React.DragEvent, type: 'invoice' | 'po') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'invoice' | 'po') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
  };

  return (
    <div className="flex h-[calc(100-4rem)] overflow-hidden bg-background">
      {/* Left Sidebar - Actions */}
      <aside className="w-80 border-r bg-card/50 backdrop-blur-xl overflow-y-auto hidden lg:block">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Process</h2>
            <Badge variant="outline" className="text-[10px] animate-pulse">Running</Badge>
          </div>
          <h1 className="text-xl font-bold">#INV-003421</h1>
          <p className="text-xs text-muted-foreground mt-1">Processed by AI Agent v2.4</p>
        </div>

        {/* Upload Panel */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              Invoice Document
            </label>
            <div
              onDragEnter={(e) => handleDrag(e, 'invoice')}
              onDragLeave={(e) => handleDrag(e, 'invoice')}
              onDragOver={(e) => handleDrag(e, 'invoice')}
              onDrop={(e) => handleDrop(e, 'invoice')}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group ${
                dragActive === 'invoice'
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-border hover:border-blue-400 hover:bg-muted/50'
              }`}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
              <p className="text-xs font-medium">Click or drag PDF</p>
              <Badge variant="secondary" className="mt-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-500" />
              Purchase Order
            </label>
            <div
              onDragEnter={(e) => handleDrag(e, 'po')}
              onDragLeave={(e) => handleDrag(e, 'po')}
              onDragOver={(e) => handleDrag(e, 'po')}
              onDrop={(e) => handleDrop(e, 'po')}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group ${
                dragActive === 'po'
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-border hover:border-blue-400 hover:bg-muted/50'
              }`}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
              <p className="text-xs font-medium">Click or drag PDF</p>
              <Badge variant="secondary" className="mt-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Agent Progress Timeline */}
        <div className="px-6 pb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Workflow Progress</h3>
          <div className="space-y-6">
            {agentSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="relative">
                  {step.status === 'completed' && (
                    <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  {step.status === 'active' && (
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                    </div>
                  )}
                  {step.status === 'pending' && (
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center border">
                      <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
                    </div>
                  )}
                  {index < agentSteps.length - 1 && (
                    <div
                      className={`absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-6 ${
                        step.status === 'completed' ? 'bg-emerald-500/30' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      step.status === 'completed'
                        ? 'text-foreground'
                        : step.status === 'active'
                        ? 'text-blue-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.status === 'active' && (
                    <p className="text-[10px] text-blue-500/80 font-medium">Analyzing document structures...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="p-8 pb-32 max-w-7xl mx-auto">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-amber-500/5 border-amber-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase">Risk Level</p>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">High Risk</h3>
                <p className="text-xs text-muted-foreground mt-1">Manual review recommended</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Risk Score</p>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">85<span className="text-sm font-normal text-muted-foreground ml-1">/100</span></h3>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div className="bg-amber-500 h-full rounded-full w-[85%]"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">AI Confidence</p>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold">92%</h3>
                <p className="text-xs text-muted-foreground mt-1">Based on 124 parameters</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Amount</p>
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">$12,450.00</h3>
                <p className="text-xs text-muted-foreground mt-1">USD • NET-45 Terms</p>
              </CardContent>
            </Card>
          </div>

          {/* Risk Flags */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="overflow-hidden border-none shadow-xl shadow-foreground/5 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <CardTitle className="text-lg">Critical Anomalies</CardTitle>
                  </div>
                  <CardDescription>Found {riskFlags.length} issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {riskFlags.map((flag) => (
                      <div key={flag.id} className="p-6 flex gap-4 hover:bg-muted/30 transition-colors group">
                        <div className={`mt-1 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                          flag.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={flag.severity === 'high' ? 'destructive' : 'outline'} className="text-[10px] h-5 rounded-md px-1.5 uppercase font-bold">
                              {flag.severity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium leading-relaxed">{flag.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Citations Panel */}
              <Card className="border-none shadow-xl shadow-foreground/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Data Verification</CardTitle>
                    <CardDescription>Line item extraction and source mapping</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Search className="h-4 w-4" />
                    Verify Sources
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Extracted JSON
                      </div>
                      <div className="bg-slate-950 rounded-xl p-4 overflow-auto max-h-[300px] border border-white/5 shadow-2xl">
                        <pre className="text-[11px] text-blue-400 font-mono leading-relaxed">
                          {JSON.stringify(extractedData, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Source OCR Mapping
                      </div>
                      <div className="border border-dashed rounded-xl p-8 bg-muted/20 h-[300px] flex flex-col items-center justify-center text-center">
                        <div className="h-12 w-12 rounded-2xl bg-background border flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold">OCR Highlight Preview</p>
                        <p className="text-xs text-muted-foreground max-w-[200px] mt-1">
                          AI identified 43 unique data points from sources.
                        </p>
                        <Button variant="link" size="sm" className="mt-4 text-blue-500">
                          Inspect Mapping Layers
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="bg-blue-600 border-none text-white shadow-2xl shadow-blue-600/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <CardHeader>
                  <CardTitle className="text-white">Review Summary</CardTitle>
                  <CardDescription className="text-blue-100 italic">"Manual confirmation needed for PO #8821 mismatch"</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-blue-100">
                      <span>Integrity Check</span>
                      <span>98%</span>
                    </div>
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[98%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-blue-100">
                      <span>Compliance Match</span>
                      <span>72%</span>
                    </div>
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[72%]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Vendor Insight</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Acme Industrial Co.</p>
                      <p className="text-xs text-muted-foreground">Supplier Tier: Platinum</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">YTD Volume</span>
                      <span className="font-bold">$1.2M</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Late Pmnt Rate</span>
                      <span className="text-emerald-500 font-bold">0.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-6 bg-background/80 backdrop-blur-xl border-t z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Decision Note</label>
              <Textarea
                placeholder="Add audit trail comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[60px] max-h-[120px] bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto shrink-0">
              <Button
                variant="outline"
                className="flex-1 md:flex-none h-14 px-8 border-red-500/50 text-red-500 hover:bg-red-500/5 hover:text-red-600 transition-all rounded-xl"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <span className="block text-xs font-bold leading-none">REJECT</span>
                  <span className="text-[10px] opacity-70">Dispute Line Items</span>
                </div>
              </Button>
              <Button
                className="flex-1 md:flex-none h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 rounded-xl border-none"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <span className="block text-xs font-bold leading-none">APPROVE</span>
                  <span className="text-[10px] opacity-70">Authorize $12,450.00</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
