import FlashSaleFeature from './FlashSaleFeature';
import SessionFeatureList from './SessionFeatureList';

export default function RewardSession() {
  return (
    <div className="desktop:gap-3 flex flex-col">
      <FlashSaleFeature />
      <SessionFeatureList />
    </div>
  );
}
