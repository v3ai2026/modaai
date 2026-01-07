# MODA AI Platform - Deployment Guide

This guide covers deploying the MODA AI Platform monorepo to Vercel and other platforms.

## 🚀 Deploying to Vercel

### Prerequisites

- A [Vercel account](https://vercel.com)
- Your repository connected to Vercel
- Required API keys (GEMINI_API_KEY, etc.)

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   
   The project includes a `vercel.json` that automatically configures:
   - Build Command: `pnpm install && pnpm build:packages && pnpm build:apps`
   - Install Command: `npm install -g pnpm@9 && pnpm install`
   - Output Directory: `apps/portal/dist`

3. **Set Environment Variables**
   
   In Project Settings → Environment Variables, add:
   
   ```
   GEMINI_API_KEY=your_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key (optional)
   NODE_VERSION=20
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain Configuration

1. Go to Project Settings → Domains
2. Add your domain (e.g., `modamoda.club`)
3. Configure DNS records as instructed by Vercel:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record pointing to `cname.vercel-dns.com`
4. Click "Verify" to confirm domain ownership

## 🏗️ Build Configuration

### Monorepo Build Pipeline

The build process follows this order:

1. **Install pnpm**: `npm install -g pnpm@9`
2. **Install dependencies**: `pnpm install`
3. **Build packages**: `pnpm build:packages`
   - Builds `@modaai/core`
   - Builds `@modaai/ui-react`
4. **Build apps**: `pnpm build:apps`
   - Builds all apps in `apps/` directory

### Turbo Configuration

The `turbo.json` file defines the build pipeline:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

This ensures packages are built before apps that depend on them.

## 🌍 Environment Variables

### Required Variables

- `GEMINI_API_KEY`: Your Google AI Studio API key
- `NODE_VERSION`: Set to `20`

### Optional Variables

- `OPENAI_API_KEY`: OpenAI API key (if using OpenAI provider)

### Setting Variables

**Vercel Dashboard:**
- Project Settings → Environment Variables
- Add each variable with appropriate scope (Production, Preview, Development)

**Vercel CLI:**
```bash
vercel env add GEMINI_API_KEY
vercel env add NODE_VERSION
```

## 🔧 Advanced Configuration

### Deploying Individual Apps

To deploy a specific app instead of the portal:

1. Update `vercel.json`:
   ```json
   {
     "outputDirectory": "apps/moda-studio/dist"
   }
   ```

2. Redeploy:
   ```bash
   vercel --prod
   ```

### Multiple Deployments

For deploying multiple apps separately:

1. Create separate Vercel projects for each app
2. Configure each with appropriate `vercel.json`
3. Set the correct `outputDirectory` for each

Example for MODA Studio:
```json
{
  "outputDirectory": "apps/moda-studio/dist"
}
```

Example for Portal:
```json
{
  "outputDirectory": "apps/portal/dist"
}
```

## 📊 Monitoring and Logs

### Viewing Build Logs

1. Go to Vercel Dashboard → Deployments
2. Click on a deployment
3. View build logs and runtime logs

### Runtime Logs

Access runtime logs via:
- Vercel Dashboard → Project → Logs
- Vercel CLI: `vercel logs`

## 🔒 Security Best Practices

1. **Never commit API keys** to the repository
2. **Use environment variables** for all secrets
3. **Set appropriate CORS policies** in production
4. **Enable security headers** in `vercel.json`

### Security Headers Example

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🐛 Troubleshooting

### Build Failures

**Issue**: Build fails with "pnpm not found"
**Solution**: Ensure `installCommand` includes pnpm installation

**Issue**: Build fails with missing dependencies
**Solution**: Run `pnpm install` locally and verify all packages build

**Issue**: Build succeeds but app doesn't work
**Solution**: Check environment variables are set correctly

### Deployment Issues

**Issue**: 404 errors on routes
**Solution**: Verify `rewrites` in `vercel.json` for SPA routing

**Issue**: API calls fail
**Solution**: Check CORS configuration and API keys

## 📞 Support

- GitHub Issues: [v3ai2026/modaai](https://github.com/v3ai2026/modaai/issues)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

---

*Powered by Google Gemini & MODA Labs*
