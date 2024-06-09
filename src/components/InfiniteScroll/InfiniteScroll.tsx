import React, {
  useState,
  useEffect,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import CircularLoader from "@/components/CircularLoader/CircularLoader";

interface Props {
  fetchData: (
    start: number,
    limit: number
  ) => Promise<{ responseData: any[]; totalPages: number }>;
  children: ReactElement;
  limit?: number;
  containerClassName?: string;
}

const InfiniteScroll: React.FC<Props> = ({
  fetchData,
  children,
  limit = 10,
  // totalPages,
  containerClassName = "",
}) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      try {
        const { responseData, totalPages } = await fetchData(
          (page - 1) * limit,
          limit
        );
        setData((prevData: any[]) => [...prevData, ...responseData]);

        setHasMore(data.length < totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, limit, page]);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    if (isIntersecting && hasMore) {
      setPage((prevPage: number) => prevPage + 1);
    }

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return (
    <div className={containerClassName}>
      {data.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {React.cloneElement(children, { item })}
        </React.Fragment>
      ))}
      {
        <div ref={ref}>
          <CircularLoader height={62} width={62} loading={hasMore && loading} />
        </div>
      }
    </div>
  );
};

export default InfiniteScroll;
