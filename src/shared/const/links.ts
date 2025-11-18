import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faVk, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export enum SOCIAL_LINKS {
   YOUTUBE = 'https://www.youtube.com',
   X = 'https://www.youtube.com',
   VK = 'https://www.youtube.com',
   FACEBOOK = 'https://www.youtube.com',
   INSTAGRAM = 'https://www.youtube.com',
   BOOSTY = 'https://www.patreon.com/c/antitopor/posts',
   PATREON = 'https://boosty.to/antitopor',
}

export interface SocialMediaDataType {
   item: string;
   icon: IconDefinition;
   link: SOCIAL_LINKS;
}

export const SocialMediaData: SocialMediaDataType[] = [
   { item: 'Youtube', icon: faYoutube, link: SOCIAL_LINKS.YOUTUBE },
   { item: 'VK', icon: faVk, link: SOCIAL_LINKS.VK },
   { item: 'Facebook', icon: faFacebook, link: SOCIAL_LINKS.FACEBOOK },
   { item: 'Instagram', icon: faInstagram, link: SOCIAL_LINKS.INSTAGRAM },
   { item: 'X', icon: faXTwitter, link: SOCIAL_LINKS.X },
];
