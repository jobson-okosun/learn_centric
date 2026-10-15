import { Component, signal } from '@angular/core';
import { ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports } from '@/shared/components/drawer';

export interface CourseBadge {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  iconBg: string;
  iconColor: string;
  iconType: 'trophy' | 'target' | 'zap' | 'flag';
  awardedTo: { name: string; avatar: string }[];
  awardedCountExtra?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  badgesCount: number;
  isCurrentUser: boolean;
}

@Component({
  imports: [ZardDrawerComponent, ZardDrawerHeaderComponent, ZardDrawerImports],
  selector: 'app-badges',
  styleUrl: './badges.css',
  templateUrl: './badges.html',
})
export default class Badges {
  readonly leaderboardDrawerVisible = signal(false);

  readonly badges = signal<CourseBadge[]>([
    {
      id: 'badge-1',
      title: 'Top Contributor',
      description: 'Awarded to students who have made 10 or more helpful discussion posts.',
      earned: true,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
      iconType: 'trophy',
      awardedTo: [
        { name: 'Jane Doe', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff' },
        { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex' },
      ],
      awardedCountExtra: 4,
    },
    {
      id: 'badge-2',
      title: 'Perfect Score',
      description: 'Got 100% on the mid-term exam or final project.',
      earned: true,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      iconType: 'target',
      awardedTo: [
        { name: 'Sam Smith', avatar: 'https://ui-avatars.com/api/?name=Sam+Smith&background=0D8ABC&color=fff' },
        { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex' },
      ],
      awardedCountExtra: 1,
    },
    {
      id: 'badge-3',
      title: 'Early Bird',
      description: 'Submitted an assignment at least 2 days before the deadline.',
      earned: false,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-500',
      iconType: 'zap',
      awardedTo: [
        { name: 'Jane Doe', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff' },
        { name: 'Sam S', avatar: 'https://ui-avatars.com/api/?name=Sam+S&background=10B981&color=fff' },
        { name: 'Alex J', avatar: 'https://ui-avatars.com/api/?name=Alex+J&background=E11D48&color=fff' },
      ],
      awardedCountExtra: 12,
    },
    {
      id: 'badge-4',
      title: 'First Step',
      description: 'Completed your first course module, video lecture, and quiz assessment.',
      earned: true,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      iconType: 'flag',
      awardedTo: [
        { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex' },
        { name: 'Jane Doe', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff' },
        { name: 'Sam S', avatar: 'https://ui-avatars.com/api/?name=Sam+S&background=10B981&color=fff' },
      ],
      awardedCountExtra: 28,
    },
  ]);

  readonly leaderboard = signal<LeaderboardEntry[]>([
    { rank: 1, name: 'Jane Doe', avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff', badgesCount: 4, isCurrentUser: false },
    { rank: 2, name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex', badgesCount: 3, isCurrentUser: true },
    { rank: 3, name: 'Sam Smith', avatar: 'https://ui-avatars.com/api/?name=Sam+Smith&background=0D8ABC&color=fff', badgesCount: 2, isCurrentUser: false },
    { rank: 4, name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=david', badgesCount: 2, isCurrentUser: false },
    { rank: 5, name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', badgesCount: 1, isCurrentUser: false },
  ]);

  closeLeaderboard() {
    this.leaderboardDrawerVisible.set(false);
  }
}
