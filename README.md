
# Ideal Portal – Updated (Separate Manager Login + Approvals)

## Quickstart

### Backend
```bash
cd backend
cp .env.example .env
# Put your real MONGO_URI + JWT_SECRET in .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Manager default (seeded):
- Email: admin@portal.com
- Password: password123

### Routes
- User login: `/login`
- Manager login: `/manager-login`
- User dashboard: `/welcome`
- Manager dashboard: `/manager`

### Notes
- Manager can view all ideas, approve/reject with a reason.
- Users see their ideas and status; if rejected, reason is displayed.
