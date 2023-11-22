import { cn, pad } from '@ahm/common-helpers';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

dayjs.extend(duration);

type Props = {
  timeEnd: Date;
  timeStart: Date;
  className: string;
};

export default function TimeBadge({ timeEnd, timeStart, className }: Props) {
  const [time, setTime] = useState<string>('00:00:00');
  useMemo(() => {
    if (new Date(timeEnd) > new Date() && new Date(timeStart) < new Date()) {
      const currentTime = dayjs();
      const diffTime = dayjs(timeEnd).unix() - currentTime.unix();

      let duration = dayjs.duration(diffTime * 1000, 'milliseconds');
      const interval = 1000;

      duration = dayjs.duration(duration.asMilliseconds() - interval, 'milliseconds');
      let timestamp = `${duration.days() ? duration.days() * 24 + duration.hours() : duration.hours()} : ${pad(
        duration.minutes(),
        2,
      )} : ${pad(duration.seconds(), 2)}`;
      setTime(timestamp);

      setInterval(function () {
        duration = dayjs.duration(duration.asMilliseconds() - interval, 'milliseconds');
        timestamp = `${duration.days() ? duration.days() * 24 + duration.hours() : duration.hours()} : ${pad(
          duration.minutes(),
          2,
        )} : ${pad(duration.seconds(), 2)}`;
        setTime(timestamp);
      }, interval);
    }
  }, [timeEnd, timeStart]);

  const formattedDate = dayjs(timeStart).format('DD/MM/YYYY | hh:mm');

  return new Date(timeStart) > new Date() ? (
    <div
      className={cn(
        'from-blue-40 to-blue-70 -ml-2 flex w-28 items-center rounded-[20px] bg-gradient-to-b px-3 py-1 shadow-md',
        className,
      )}>
      <span className="text-xxs text-neutral-00 whitespace-nowrap font-semibold">{formattedDate}</span>
    </div>
  ) : new Date(timeEnd) > new Date() && new Date(timeStart) < new Date() ? (
    <div
      className={cn(
        'from-primary-60 flex w-24 items-center rounded-[20px] bg-gradient-to-b to-[#E81717] px-3 py-1 shadow-md',
        className,
      )}>
      <Image src={`/static/icons/rewards/Countdown.svg`} width={12} height={12} alt="countdown" />
      <span className="text-xxs text-neutral-00 ml-1 whitespace-nowrap font-bold">{time}</span>
    </div>
  ) : (
    <></>
  );
}
