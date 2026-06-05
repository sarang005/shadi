import profileRepository from '../repositories/profileRepository.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';

const MOCK_PROFILES = [
  { id: '1', name: 'Kavya Iyer', age: 26, occupation: 'CA', city: 'Chennai', religion: 'Tamil Brahmin', score: 94, emoji: '👩', verified: true },
  { id: '2', name: 'Priya Rao', age: 25, occupation: 'Doctor', city: 'Bangalore', religion: 'Hindu', score: 91, emoji: '👩', verified: true },
  { id: '3', name: 'Sneha Kapoor', age: 27, occupation: 'MBA', city: 'Mumbai', religion: 'Hindu', score: 88, emoji: '👩', verified: false },
  { id: '4', name: 'Arjun Mehta', age: 30, occupation: 'Engineer', city: 'Bangalore', religion: 'Gujarati', score: 86, emoji: '👨', verified: true },
];

class MatchesService {
  async listMatches(query) {
    const { page, limit, skip } = parsePagination(query);

    const dbProfiles = await profileRepository.findPublishedProfiles({ skip, limit });
    const total = await profileRepository.countPublished();
    const profiles =
      dbProfiles.length > 0
        ? dbProfiles.map((p) => ({
            id: p._id,
            name: p.user?.name,
            detail: `${p.occupation || '—'} · ${p.city || '—'}`,
            score: 85 + Math.floor(Math.random() * 10),
            emoji: p.user?.avatar || '👤',
            verified: p.isVerified,
          }))
        : MOCK_PROFILES;

    const totalCount = total > 0 ? total : MOCK_PROFILES.length;

    return {
      profiles,
      totalCount,
      pagination: buildPaginationMeta({ page, limit, total: totalCount }),
    };
  }

  async getMatchById(id) {
    const profile = await profileRepository.findById(id);
    if (profile) return profile;
    return MOCK_PROFILES.find((p) => p.id === id) || MOCK_PROFILES[0];
  }

  async toggleInterest(id, liked) {
    return { id, liked, message: liked ? 'Interest sent' : 'Interest removed' };
  }

  async toggleShortlist(id, shortlisted) {
    return { id, shortlisted, message: shortlisted ? 'Added to shortlist' : 'Removed from shortlist' };
  }
}

export default new MatchesService();
