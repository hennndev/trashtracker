import React, { useEffect } from "react"
import clsx from "clsx"
import { router, usePage } from "@inertiajs/react"


const Pagination = ({ current_page, last_page }) => {
  const { url } = usePage()
  const params = new URLSearchParams(url.split('?')[1])
  const query_page = params.get("page") || null

  const generatePages = () => {
    const delta = 2 
    let start = Math.max(1, ((current_page - delta) + 2) - 1)
    const isLast = last_page - start
    if (last_page > 5 && isLast < 5) {
      start = last_page - 4
    }
    let end = Math.min(last_page, ((current_page + delta) + 2))

    if(last_page < 6) {
      start = 1
      end = last_page
    }
    
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }



  useEffect(() => {
    const page = Number(query_page);
    if (page > last_page) {
      router.visit('/admin/incomes', {
        replace: true,
        preserveState: true,
      })
    }
  }, [query_page, last_page])


  return (
    <div className="flex gap-4">
      <button disabled={current_page === 1} className={clsx("mr-2 outline-none", current_page === 1 ? "text-gray-300 cursor-default" : "text-gray-500 hover:text-blue-500 cursor-pointer hover:font-semibold")} onClick={() => router.get(`?page=${current_page - 1}`)}>Prev</button>
      {generatePages().map((page) => (
        <button
          key={page}
          className={clsx("cursor-pointer", page === current_page ? "text-blue-500 font-black" : "text-gray-500")}
          onClick={() => router.get(`?page=${page}`)}
        >
          {page}
        </button>
      ))}
      <button disabled={current_page === last_page} className={clsx("ml-2 outline-none", current_page === last_page ? "text-gray-300 cursor-default" : "text-gray-500 hover:text-blue-500 cursor-pointer hover:font-semibold")} onClick={() => router.get(`?page=${current_page + 1}`)}>Next</button>
    </div>
  )
}


export default Pagination