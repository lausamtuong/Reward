export const isServer = typeof window === 'undefined';

export const SEARCH_PARAMS_WEBINAPP = 'webinapp';
export const SEARCH_PARAMS_PROTOCOL = 'protocol';

export const PAGE_INDEX = 0;
export const PAGE_SIZE = 24;

export enum OrderType {
  BIKE = 'BIKE',
  TRUCK = 'TRUCK',
  EV = 'EV',
}

export const BookingLink = {
  TRUCK: {
    linkMobile: 'ahamove://new_order?delivery_type=TRUCK',
    linkDesktop: `${process.env.NEXT_PUBLIC_APP_VUE_URI}/truck`,
  },
  EV: {
    linkMobile: 'ahamove://aharide',
    linkDesktop: `${process.env.NEXT_PUBLIC_EV_URI}`,
  },
  BIKE: {
    linkMobile: 'ahamove://new_order',
    linkDesktop: `${process.env.NEXT_PUBLIC_APP_VUE_URI}`,
  },
};
