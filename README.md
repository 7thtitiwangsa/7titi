# Pengakap Laut 7 Titiwangsa - Leaders Portal

Sistema pengurusan lengkap untuk Pengakap Laut 7 Titiwangsa dengan frontend modern yang connected ke NocoDB backend.

## 🎯 Features

### ✅ Implemented (v1.0)
- **Dashboard** - Overview statistik dan quick actions
- **Badge Verification** - Review & approve badge completions
- **Scouts Management** - View dan manage scout profiles
- **Responsive Design** - Mobile-friendly interface
- **Professional UI** - Modern design dengan Pengakap branding

### 🚧 Coming Soon (v1.1)
- Attendance Management
- Payment Tracking
- Events Management
- Announcements
- Settings & Configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- NocoDB instance running (Railway)
- Vercel account (free tier OK)

### Local Development

1. **Clone/Download project**
```bash
cd pengakap-system
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

**Demo Login:**
- Email: leader@pengakap7.com
- Password: (any password works in demo mode)

## 📦 Deploy to Vercel (FREE)

### Option 1: Deploy via Vercel Dashboard

1. **Push code to GitHub**
   - Create new GitHub repository
   - Push project code
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Wait 2-3 minutes

3. **Done!** 🎉
   - Your app will be live at: `your-app.vercel.app`

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## 🔧 Configuration

### Environment Variables

Your NocoDB credentials are already configured in `next.config.js`:

```javascript
NEXT_PUBLIC_NOCODB_URL: 'https://nocodb-production-c4d4.up.railway.app'
NEXT_PUBLIC_NOCODB_TOKEN: 'Q9zyXQy1N-bBmTjIrKidydVnN_OgZHsbrNNSUfTK'
```

⚠️ **Security Note:** For production, move these to Vercel environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the variables there
3. Remove them from `next.config.js`

## 📁 Project Structure

```
pengakap-system/
├── app/                      # Next.js App Router
│   ├── dashboard/            # Dashboard pages
│   │   ├── badges/           # Badge verification
│   │   ├── scouts/           # Scouts management
│   │   ├── attendance/       # Attendance (coming soon)
│   │   ├── payments/         # Payments (coming soon)
│   │   ├── events/           # Events (coming soon)
│   │   └── layout.js         # Dashboard layout with sidebar
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   └── page.js               # Landing/Login page
├── lib/
│   └── nocodb.js             # NocoDB API functions
├── components/               # Reusable components (future)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
└── package.json              # Dependencies
```

## 🎨 Design System

### Colors
- **Pengakap Green:** #006747
- **Pengakap Gold:** #FFD700
- **Pengakap Navy:** #003B5C

### Components
Custom Tailwind classes available:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card container
- `.badge` - Badge/pill
- `.badge-success` - Green badge
- `.badge-warning` - Yellow badge
- `.badge-danger` - Red badge
- `.badge-info` - Blue badge

## 🔌 NocoDB API Integration

### Available Functions

All API functions are in `lib/nocodb.js`:

```javascript
// Badge APIs
getBadgeProgress(filters)
getPendingVerifications()
getInProgressBadges()
getOverdueBadges()
verifyBadge(recordId, leaderId)

// Scout APIs
getScouts(filters)
getActiveScouts()
getScoutById(scoutId)

// Event APIs
getEvents(filters)
getUpcomingEvents()
createEvent(eventData)

// And more...
```

### Adding New API Calls

Example:
```javascript
// In lib/nocodb.js
export async function getScoutsByRank(rank) {
  return nocoRequest(`/api/v2/tables/Scouts/records?where=(current_rank,eq,${rank})`)
}

// In your component
import { getScoutsByRank } from '@/lib/nocodb'

const scouts = await getScoutsByRank('Peringkat 2')
```

## 🛠️ Development Guide

### Adding New Pages

1. Create file in `app/dashboard/[name]/page.js`
2. Add to navigation in `app/dashboard/layout.js`

Example:
```javascript
// app/dashboard/documents/page.js
'use client'

export default function DocumentsPage() {
  return (
    <div>
      <h1>Documents</h1>
      {/* Your content */}
    </div>
  )
}
```

### Using Mock Data for Development

If NocoDB is down or you're testing:

```javascript
try {
  const data = await getScouts()
  setScouts(data.list)
} catch (error) {
  // Fallback to mock data
  setScouts([
    { id: 1, full_name: 'Ahmad', rank: 'Peringkat 2' },
    { id: 2, full_name: 'Siti', rank: 'Peringkat 3' },
  ])
}
```

## 📱 Responsive Design

The app is fully responsive:
- **Desktop:** Full sidebar navigation
- **Tablet:** Collapsible sidebar (future)
- **Mobile:** Optimized layouts

Test on different screen sizes before deploying!

## 🔐 Authentication (Current Implementation)

**Current:** Simple localStorage-based auth for demo
**Production:** Implement proper authentication:
- NextAuth.js with NocoDB user validation
- JWT tokens
- Role-based access control

## 🚀 Performance Tips

1. **Images:** Use Next.js Image component
2. **API Calls:** Use React Query or SWR for caching
3. **Loading States:** Always show loading indicators
4. **Error Handling:** Catch and display errors properly

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next
npm run build
```

### API Connection Issues

Check:
1. NocoDB URL is correct
2. API token is valid
3. Network restrictions (if any)

### Vercel Deployment Failed

- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables

## 📞 Support

**For System Issues:**
- Check NocoDB status
- Verify API credentials
- Review browser console for errors

**For Feature Requests:**
Contact your system administrator

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- Dashboard
- Badge Verification
- Scouts Listing

### Phase 2 (Next 2 weeks)
- Attendance Management
- Payment Tracking
- Event Creation

### Phase 3 (Month 2)
- Mobile App (React Native)
- Push Notifications
- Offline Mode

### Phase 4 (Month 3)
- Reports & Analytics
- Parent Portal
- Scout Portal

## 📊 System Requirements

### Minimum
- Node.js 18+
- 512MB RAM
- Modern browser

### Recommended
- Node.js 20+
- 1GB RAM
- Chrome/Firefox/Safari (latest)

## 🎓 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NocoDB API](https://docs.nocodb.com/)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

MIT License - Feel free to use and modify for your troop!

## 👥 Credits

Built for **Pengakap Laut 7 Titiwangsa**
Developed: November 2024

---

**🚀 Ready to deploy?** Just run `vercel` in your terminal!

**Need help?** Check the troubleshooting section above or contact support.
