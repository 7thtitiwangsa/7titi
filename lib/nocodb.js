const NOCODB_URL = process.env.NEXT_PUBLIC_NOCODB_URL;
const NOCODB_TOKEN = process.env.NEXT_PUBLIC_NOCODB_TOKEN;

// Base API headers
const headers = {
  'xc-token': NOCODB_TOKEN,
  'Content-Type': 'application/json',
};

// Helper function to make API requests
async function nocoRequest(endpoint, options = {}) {
  const url = `${NOCODB_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('NocoDB API Error:', error);
    throw error;
  }
}

// Get all bases/projects
export async function getBases() {
  return nocoRequest('/api/v2/meta/bases');
}

// Get tables in a base
export async function getTables(baseId) {
  return nocoRequest(`/api/v2/meta/bases/${baseId}/tables`);
}

// Badge Progress APIs
export async function getBadgeProgress(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Badge_Progress/records?${params}`);
}

export async function getPendingVerifications() {
  return nocoRequest('/api/v2/tables/Badge_Progress/records?where=(status,eq,Completed)~and(verified_by,is,null)');
}

export async function getInProgressBadges() {
  return nocoRequest('/api/v2/tables/Badge_Progress/records?where=(status,eq,In Progress)');
}

export async function getOverdueBadges() {
  return nocoRequest('/api/v2/tables/Badge_Progress/records?where=(days_in_progress,gt,90)~and(status,neq,Verified)');
}

export async function verifyBadge(recordId, leaderId) {
  return nocoRequest(`/api/v2/tables/Badge_Progress/records/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'Verified',
      verified_by: leaderId,
      date_verified: new Date().toISOString().split('T')[0],
    }),
  });
}

// Scouts APIs
export async function getScouts(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Scouts/records?${params}`);
}

export async function getActiveScouts() {
  return nocoRequest('/api/v2/tables/Scouts/records?where=(active_status,eq,true)');
}

export async function getScoutById(scoutId) {
  return nocoRequest(`/api/v2/tables/Scouts/records/${scoutId}`);
}

// Events APIs
export async function getEvents(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Events/records?${params}`);
}

export async function getUpcomingEvents() {
  const today = new Date().toISOString().split('T')[0];
  return nocoRequest(`/api/v2/tables/Events/records?where=(event_date,ge,${today})~and(status,neq,Cancelled)&sort=-event_date`);
}

export async function createEvent(eventData) {
  return nocoRequest('/api/v2/tables/Events/records', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
}

// Attendance APIs
export async function getAttendance(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Attendance/records?${params}`);
}

export async function getTodayAttendance() {
  const today = new Date().toISOString().split('T')[0];
  return nocoRequest(`/api/v2/tables/Attendance/records?where=(event_date,eq,${today})`);
}

export async function markAttendance(attendanceData) {
  return nocoRequest('/api/v2/tables/Attendance/records', {
    method: 'POST',
    body: JSON.stringify(attendanceData),
  });
}

export async function updateAttendance(recordId, data) {
  return nocoRequest(`/api/v2/tables/Attendance/records/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// Payments APIs
export async function getPayments(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Payments/records?${params}`);
}

export async function getOutstandingPayments() {
  return nocoRequest('/api/v2/tables/Payments/records?where=(payment_status,in,Outstanding,Partial)');
}

export async function getOverduePayments() {
  const today = new Date().toISOString().split('T')[0];
  return nocoRequest(`/api/v2/tables/Payments/records?where=(due_date,lt,${today})~and(payment_status,neq,Paid)`);
}

export async function updatePayment(recordId, paymentData) {
  return nocoRequest(`/api/v2/tables/Payments/records/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify(paymentData),
  });
}

// Announcements APIs
export async function getAnnouncements(filters = {}) {
  const params = new URLSearchParams(filters);
  return nocoRequest(`/api/v2/tables/Announcements/records?${params}`);
}

export async function getActiveAnnouncements() {
  return nocoRequest('/api/v2/tables/Announcements/records?where=(status,eq,Published)~and(is_active,eq,Active)&sort=-pin_to_top,-publish_date');
}

export async function createAnnouncement(announcementData) {
  return nocoRequest('/api/v2/tables/Announcements/records', {
    method: 'POST',
    body: JSON.stringify(announcementData),
  });
}

// Leaders APIs
export async function getLeaders() {
  return nocoRequest('/api/v2/tables/Leaders/records?where=(active_status,eq,true)');
}

export async function getLeaderById(leaderId) {
  return nocoRequest(`/api/v2/tables/Leaders/records/${leaderId}`);
}

// Dashboard Statistics
export async function getDashboardStats() {
  try {
    const [
      pendingBadges,
      overdueBadges,
      upcomingEvents,
      outstandingPayments,
      activeScouts,
    ] = await Promise.all([
      getPendingVerifications(),
      getOverdueBadges(),
      getUpcomingEvents(),
      getOutstandingPayments(),
      getActiveScouts(),
    ]);

    return {
      pendingVerifications: pendingBadges.list?.length || 0,
      overdueBadges: overdueBadges.list?.length || 0,
      upcomingEvents: upcomingEvents.list?.length || 0,
      outstandingPayments: outstandingPayments.list?.length || 0,
      totalScouts: activeScouts.list?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      pendingVerifications: 0,
      overdueBadges: 0,
      upcomingEvents: 0,
      outstandingPayments: 0,
      totalScouts: 0,
    };
  }
}

export default {
  getBadgeProgress,
  getPendingVerifications,
  getInProgressBadges,
  getOverdueBadges,
  verifyBadge,
  getScouts,
  getActiveScouts,
  getScoutById,
  getEvents,
  getUpcomingEvents,
  createEvent,
  getAttendance,
  getTodayAttendance,
  markAttendance,
  updateAttendance,
  getPayments,
  getOutstandingPayments,
  getOverduePayments,
  updatePayment,
  getAnnouncements,
  getActiveAnnouncements,
  createAnnouncement,
  getLeaders,
  getLeaderById,
  getDashboardStats,
};
