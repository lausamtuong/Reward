import { Skeleton } from 'antd-mobile';

interface Props {
  isVertical?: boolean;
}
export default function SkeletonCard({ isVertical }: Props) {
  return (
    <div className="">
      {isVertical ? (
        <div className="flex gap-4">
          <Skeleton
            animated
            style={{
              '--height': '120px',
              '--width': '120px',
              '--border-radius': '8px',
            }}
          />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton
                animated
                style={{
                  '--height': '20px',
                  '--width': '80px',
                  '--border-radius': '8px',
                }}
              />
              <Skeleton
                animated
                style={{
                  '--height': '20px',
                  '--border-radius': '8px',
                }}
              />
            </div>
            <div className="flex justify-between">
              <Skeleton
                animated
                style={{
                  '--height': '20px',
                  '--width': '130px',
                  '--border-radius': '8px',
                }}
              />
              <Skeleton
                animated
                style={{
                  '--height': '20px',
                  '--width': '80px',
                  '--border-radius': '8px',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {' '}
          <Skeleton
            animated
            style={{
              '--height': '140px',
              '--border-radius': '8px',
            }}
          />
          <Skeleton.Title />
          <Skeleton.Paragraph />
        </>
      )}
    </div>
  );
}
