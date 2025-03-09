import { useAppDispatch, useAppSelector } from '@/state/redux';
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchPage = () => {
    const searchparams = useSearchParams();
    const dispath = useAppDispatch();
    const isFiltersFullOpen = useAppSelector(
        (state)=>state.global.isFiltersFullOpen
    );

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage