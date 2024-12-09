import { ShayariCard } from './ShayariCard';

export function ShayariGrid({ shayaris }) {
  if (!shayaris.length) {
    return <p className="text-center text-gray-500 mt-8">No shayaris found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shayaris.map((shayari) => (
        <ShayariCard key={shayari._id} shayari={shayari} />
      ))}
    </div>
  );
}
