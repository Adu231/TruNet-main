import { useState } from "react";
import { Code2, Play, Check, ShieldCheck, Terminal, Copy, Key } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

type Lang = "curl" | "javascript" | "python" | "go";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/v1/users/{userId}/trust-score",
    desc: "Retrieve the verified trust score index, verification status metrics, and feedback log summaries for a specific member ID.",
    headers: { Authorization: "Bearer sec_key_..." },
    codes: {
      curl: `curl -X GET "https://api.trunet.network/v1/users/usr_pro_001/trust-score" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      javascript: `fetch("https://api.trunet.network/v1/users/usr_pro_001/trust-score", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
      python: `import requests

url = "https://api.trunet.network/v1/users/usr_pro_001/trust-score"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())`,
      go: `package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {
	req, _ := http.NewRequest("GET", "https://api.trunet.network/v1/users/usr_pro_001/trust-score", nil)
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	client := &http.Client{}
	res, _ := client.Do(req)
	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)
	fmt.Println(string(body))
}`
    },
    response: {
      status: "200 OK",
      data: {
        userId: "usr_pro_001",
        name: "Alex Johnson",
        trustScore: 92,
        isIdentityVerified: true,
        isKYCVerified: true,
        connectionsCount: 847,
        kycValidatedAt: "2024-03-15T11:42:00Z"
      }
    }
  },
  {
    method: "POST",
    path: "/v1/verifications/kyc",
    desc: "Initiate a KYC verification check mandate. Submit document uploads or validation metadata secure nodes.",
    headers: { Authorization: "Bearer sec_key_...", "Content-Type": "application/json" },
    codes: {
      curl: `curl -X POST "https://api.trunet.network/v1/verifications/kyc" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"documentType": "passport", "country": "US"}'`,
      javascript: `fetch("https://api.trunet.network/v1/verifications/kyc", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    documentType: "passport",
    country: "US"
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
      python: `import requests

url = "https://api.trunet.network/v1/verifications/kyc"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {"documentType": "passport", "country": "US"}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
      go: `package main

import (
	"bytes"
	"fmt"
	"net/http"
	"io"
)

func main() {
	body := []byte(\`{"documentType": "passport", "country": "US"}\`)
	req, _ := http.NewRequest("POST", "https://api.trunet.network/v1/verifications/kyc", bytes.NewBuffer(body))
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	res, _ := client.Do(req)
	defer res.Body.Close()
	bodyRes, _ := io.ReadAll(res.Body)
	fmt.Println(string(bodyRes))
}`
    },
    response: {
      status: "201 Created",
      data: {
        verificationId: "ver_kyc_88923",
        status: "processing",
        nodeValidator: "validator_node_us_east_2",
        createdAt: new Date().toISOString()
      }
    }
  }
];

export default function ApiDocs() {
  const [activeLang, setActiveLang] = useState<Lang>("curl");
  const [isRunning, setIsRunning] = useState<string | null>(null);
  const [runResponse, setRunResponse] = useState<Record<string, any> | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleRunRequest = (endpointPath: string, mockResponse: any) => {
    setIsRunning(endpointPath);
    setRunResponse(null);
    setTimeout(() => {
      setIsRunning(null);
      setRunResponse(mockResponse);
      toast.success("Request executed successfully!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Developer Console
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
            TruNet <span className="gradient-text-brand">API Reference</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Integrate verified professional identity, reputation audit logs, and trust scoring nodes directly into your applications.
          </p>
        </section>

        {/* Api details grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Sidebar documentation navigation (left column) */}
          <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Getting Started</h3>
            <div className="space-y-1 text-xs">
              <button className="w-full text-left py-2 px-3.5 rounded-lg bg-primary/10 text-primary font-semibold">Overview</button>
              <button className="w-full text-left py-2 px-3.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">Authentication</button>
              <button className="w-full text-left py-2 px-3.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">SLA & Limits</button>
              <button className="w-full text-left py-2 px-3.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">SDKs</button>
            </div>
            
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 pt-2">API Endpoints</h3>
            <div className="space-y-1 text-xs">
              {ENDPOINTS.map(ep => (
                <a
                  key={ep.path}
                  href={`#${ep.path}`}
                  className="block w-full text-left py-2 px-3.5 rounded-lg hover:bg-muted text-muted-foreground truncate hover:text-foreground transition-colors"
                >
                  <span className="font-bold mr-1 text-[10px] text-primary">{ep.method}</span> {ep.path.replace("/v1", "")}
                </a>
              ))}
            </div>
          </div>

          {/* Code playground & references (right columns) */}
          <div className="lg:col-span-4 space-y-12">
            {/* Overview / Auth Card */}
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                  <Key className="text-primary" size={18} /> Authentication
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Authenticate your API requests by including a secure Bearer token in the request header. Generate your key inside the developer section of your TruNet settings page.
                </p>
                <div className="p-3.5 rounded-xl border border-border bg-muted/40 font-mono text-xs flex items-center justify-between text-muted-foreground">
                  <span>Authorization: Bearer trunet_sec_key_xyz123...</span>
                  <Copy size={13} className="hover:text-primary cursor-pointer" onClick={() => handleCopy("Authorization: Bearer trunet_sec_key_xyz123")} />
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" /> API Security
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  All API keys use advanced cryptographic hashing, and endpoints are rate-limited to 60 requests per minute to prevent service abuse.
                </p>
              </div>
            </div>

            {/* Endpoints section */}
            <div className="space-y-8">
              {ENDPOINTS.map((endpoint) => (
                <div key={endpoint.path} id={endpoint.path} className="border border-border bg-card rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  {/* Endpoint Header */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold text-white ${endpoint.method === "POST" ? "bg-emerald-600" : "bg-primary"}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-semibold text-foreground font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2.5">
                      {endpoint.desc}
                    </p>
                  </div>

                  {/* Language Selector + Code Box */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Code Block Container */}
                    <div>
                      <div className="flex items-center justify-between bg-muted/60 px-4 py-2 border border-border border-b-transparent rounded-t-xl text-xs">
                        <div className="flex items-center gap-1 font-semibold text-muted-foreground">
                          <Code2 size={13} /> Code Sample
                        </div>
                        <div className="flex gap-2.5">
                          {(["curl", "javascript", "python", "go"] as Lang[]).map((ln) => (
                            <button
                              key={ln}
                              onClick={() => setActiveLang(ln)}
                              className={`capitalize font-medium transition-colors ${activeLang === ln ? "text-primary font-bold" : "text-muted-foreground/70 hover:text-muted-foreground"}`}
                            >
                              {ln === "curl" ? "cURL" : ln}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative font-mono text-[11px] p-4 bg-muted border border-border rounded-b-xl leading-normal text-foreground overflow-x-auto min-h-[140px]">
                        <button
                          onClick={() => handleCopy(endpoint.codes[activeLang])}
                          className="absolute right-3 top-3 p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                          aria-label="Copy code"
                        >
                          <Copy size={12} />
                        </button>
                        <pre className="whitespace-pre">{endpoint.codes[activeLang]}</pre>
                      </div>
                    </div>

                    {/* Right: Interactive Terminal Playground */}
                    <div className="flex flex-col justify-between border border-border bg-muted/20 rounded-2xl p-5 relative min-h-[200px]">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3">
                          <Terminal size={12} /> Live Request Sandbox
                        </span>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Test this API query live. Returns mocked JSON payload from the closest sandbox validator node.
                        </p>
                      </div>

                      <div className="mt-4 space-y-4">
                        <button
                          onClick={() => handleRunRequest(endpoint.path, endpoint.response)}
                          disabled={isRunning !== null}
                          className="btn-primary w-full py-2.5 text-xs font-semibold justify-center flex items-center gap-1.5"
                        >
                          {isRunning === endpoint.path ? (
                            <>
                              <div className="w-3 h-3 rounded-full border border-white border-t-transparent animate-spin" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play size={12} /> Run Request
                            </>
                          )}
                        </button>

                        {/* Interactive Response Display */}
                        {runResponse && (
                          <div className="bg-foreground text-background dark:bg-muted dark:text-foreground font-mono text-[10px] p-3 rounded-xl max-h-[160px] overflow-y-auto animate-fade-in-up border border-border">
                            <div className="flex justify-between border-b border-border/10 pb-1 mb-1.5 text-[9px] text-muted-foreground/80 font-semibold">
                              <span>Response Body</span>
                              <span className="text-emerald-500 font-bold">{endpoint.response.status}</span>
                            </div>
                            <pre className="whitespace-pre-wrap">{JSON.stringify(runResponse.data, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
