import { color } from '@ahamove/design-tokens';
import { LocaleContent } from '@/api/types';

export interface MembershipLevel {
  rank: number;
  name: string;
  title: string;
  bg: string;
  icon: string;
  nextLevel: string;
  nextIcon: string;
  bgBlur: string;
  description?: LocaleContent;
  maxValue?: number;
  color: string;
}
export const RankName = {
  MEMBER: 'MEMBER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
};

export const membershipStyle: MembershipLevel[] = [
  {
    rank: 0,
    name: 'MEMBER',
    title: 'newMember',
    bg: 'bg-new-member',
    icon: `/static/images/rewards/new-member.png`,
    nextLevel: 'gold',
    nextIcon: `/static/images/rewards/gold-member.png`,
    bgBlur: 'bg-new-10',
    color: color.secondary[90],
  },
  {
    rank: 1,
    name: 'GOLD',
    title: 'goldMember',
    bg: 'bg-gold',
    nextLevel: 'platinum',
    icon: `/static/images/rewards/gold-member.png`,
    bgBlur: 'bg-gold-10',
    nextIcon: `/static/images/rewards/silver-member.png`,
    color: color.neutral[90],
  },
  {
    rank: 2,
    name: 'PLATINUM',
    title: 'platinumMember',
    bg: 'bg-platinum',
    nextLevel: 'diamond',
    icon: `/static/images/rewards/silver-member.png`,
    bgBlur: 'bg-platinum-10',
    nextIcon: `/static/images/rewards/diamond-member.png`,
    color: '#301503',
  },
  {
    rank: 3,
    name: 'DIAMOND',
    title: 'diamondMember',
    bg: 'bg-diamond',
    icon: `/static/images/rewards/diamond-member.png`,
    nextLevel: '',
    nextIcon: '',
    bgBlur: 'bg-diamond-10',
    color: '#120338',
  },
];
