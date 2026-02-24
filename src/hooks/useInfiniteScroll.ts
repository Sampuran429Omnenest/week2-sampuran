import { useCallback, useEffect, useRef, useState } from "react";

function useInfiniteScroll<T>(items : T[],batchSize=10){
    //state and ref defining
    const [visibleCount,setVisibleCount]=useState(batchSize);
    const bottomRef=useRef<HTMLDivElement>(null);
    //load more
    const loadMore=useCallback(function(){
        setVisibleCount(function(currentCount){
            const nextCount=currentCount+batchSize;
            if(nextCount>items.length){
                return items.length;
            }
            return nextCount;
        });
    },[batchSize,items.length]);
    //observer
    useEffect(function(){
        const bottomDiv=bottomRef.current;
        if(bottomDiv==null){
            return;
        }
        const observer=new IntersectionObserver(function(entries){
        const entry=entries[0];
        if(entry.isIntersecting===true){
            loadMore();
        }
    })
    observer.observe(bottomDiv);
    return function(){
        observer.disconnect();
    }
    },[loadMore]);
    //return 
    const visibleItems=items.slice(0,visibleCount);
    const hasMore=visibleCount<items.length;
    return {visibleItems,bottomRef,hasMore};
}
export default useInfiniteScroll;