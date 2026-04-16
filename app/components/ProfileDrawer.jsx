// components/ProfileDrawer.jsx
"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";

export default function ProfileDrawer({ isOpen, onClose, profile }) {
  if (!profile) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                      <Dialog.Title className="text-lg font-semibold">
                        {profile.name}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-slate-100"
                      >
                        <HiOutlineX className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1">
                      {/* Same profile content as above but without header */}
                      {/* Copy the profile content from the page component */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
