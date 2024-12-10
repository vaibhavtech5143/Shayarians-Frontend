import { ShayariCard } from './ShayariCard';

export function ShayariGrid({ shayaris }) {
  if (!shayaris.length) {
    return <p className="text-center text-gray-500 mt-8">No shayaris found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {shayaris.map((shayari) => (
        <ShayariCard key={shayari._id} shayari={shayari} />
      ))}
    </div>
  );
}
