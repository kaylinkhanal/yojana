import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div><section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.</p>
      </div>

      <div class="flex flex-wrap -m-4">
   
        <div class="lg:w-1/3 sm:w-1/2 p-4">
          <div class="flex relative">
          <Link href="/admin/products">
            <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white  hover:opacity-100">
              <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">Products</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Add/Delete/Edit product</h1>
              <p class="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            </div>
            </Link>
          </div>
        </div>
 

        <div class="lg:w-1/3 sm:w-1/2 p-4">
          <div class="flex relative">
          <Link href="/admin/categories">
            <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white hover:opacity-100">
              <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">Categories</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Add/Del/Edit categories, and feature categories</h1>
              <p class="leading-relaxed">Add Categories and sub categories.</p>
              
            </div>
        </Link>

          </div>
        </div>
        <div class="lg:w-1/3 sm:w-1/2 p-4">
          <div class="flex relative">
            <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
              <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Neptune</h1>
              <p class="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  </section></div>
  )
}

export default page