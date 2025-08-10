import { useState } from "react";
import { nodeConfig } from "@/canvas/nodeConfigs";
import { Button } from "./ui/button";
import SubmitButton from "./Submit";
import { Search } from "lucide-react";

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter node configs based on search term
  const filteredNodeConfig = nodeConfig.filter((cfg) =>
    cfg.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-neutral-50 w-full h-36 border shadow rounded-b-lg flex flex-col justify-center p-3'>
      <div className='flex flex-col gap-1.5'>
        {/* Search field and Node buttons */}
        {/* Search field */}
        <div className='flex justify-between items-center'>
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search nodes...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 pr-3 py-2 h-8 w-56 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            />
          </div>

          {/* Submit button */}
          <div className='flex items-center'>
            <SubmitButton />
          </div>
        </div>
        <div className='flex flex-col items- gap-2 overflow-scroll hide-scrollbar'>
          {/* Node buttons */}
          <div className='flex gap-3'>
            {filteredNodeConfig.length === 0 ? (
              <div className='h-20 w-22 flex flex-col gap-0.5'>No node</div>
            ) : (
              filteredNodeConfig.map((cfg) => (
                <Button
                  key={cfg.type}
                  variant='outline'
                  className='h-20 w-22 flex flex-col gap-1 hover:border-indigo-600 hover:bg-indigo-50'
                  draggable
                  onDragStart={(event) =>
                    event.dataTransfer.setData(
                      "application/reactflow",
                      cfg.type
                    )
                  }
                >
                  <cfg.icon className='w-5 h-5 text-indigo-600' />
                  <span className='text-sm'>{cfg.label}</span>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
