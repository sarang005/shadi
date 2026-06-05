import userService from './userService.js';

class DashboardService {
  async getStats(userId) {
    const base = await userService.getDashboardForUser(userId);
    return { stats: base.stats, profileStrength: base.profileStrength };
  }

  async getActivity() {
    return {
      activities: [
        { icon: '💌', iconClass: 'actInterest', text: '<strong>Rohit Verma</strong> sent you an interest request', time: '2 minutes ago', unread: true },
        { icon: '👁️', iconClass: 'actView', text: '<strong>Arjun Mehta</strong> viewed your profile', time: '14 minutes ago' },
        { icon: '⭐', iconClass: 'actShortlist', text: 'You shortlisted <strong>Priya Rao</strong>', time: '1 hour ago' },
      ],
    };
  }

  async getShortlist() {
    return {
      shortlist: [
        { id: '1', name: 'Kavya Iyer', detail: '26 · CA · Chennai', score: 94, emoji: '👩' },
        { id: '2', name: 'Priya Rao', detail: '25 · Doctor · Bangalore', score: 91, emoji: '👩' },
      ],
    };
  }

  async getTodayMatches() {
    return {
      todayMatches: [
        { id: '1', name: 'Kavya Iyer', detail: '26 · CA · Chennai', score: 94, photoClass: 'photo-1', badge: 'NEW', emoji: '👩' },
        { id: '2', name: 'Priya Rao', detail: '25 · Doctor · Bangalore', score: 91, photoClass: 'photo-5', badge: '✓', emoji: '👩' },
      ],
    };
  }
}

export default new DashboardService();
