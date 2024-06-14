import { Button } from '@/features/shared/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/features/dashboard/pagination/domain';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  function handlePagination(page: number) {
    const defaultParams = {
      search: searchParams.get('search') ?? '',
      status: searchParams.get('status') ?? '',
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  }

  const allPages = generatePagination({ currentPage, totalPages });

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => handlePagination(currentPage - 1)}
        variant="outline"
      >
        <ChevronLeft />
      </Button>
      {allPages.map((page, i) => {
        return typeof page === 'string' ? (
          <Button key={`dots-${i}`} size="icon" variant="outline">
            {page}
          </Button>
        ) : (
          <Button
            key={page}
            size="icon"
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePagination(page)}
          >
            {page}
          </Button>
        );
      })}
      <Button
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => handlePagination(currentPage + 1)}
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
