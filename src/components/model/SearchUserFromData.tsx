"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SelectedUserChat from "../ui/selected-user-chat";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchUserValue from "../ui/search-user-value";

const SearchUserFromData = ({
  children,
  data,
  onSelect,
  type,
  props,
}: {
  children: React.ReactNode;
  data: any[];
  onSelect?: (selectedData: any[]) => void;
  type: "chat" | "friend";
  props?: any;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (item: any) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    if (onSelect) {
      onSelect(selectedItems);
    }
    setOpen(false);
  };

  const filteredData = data.filter((item) =>
    (item.first_name + " " + item.last_name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger {...props}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-slate-800 max-h-2/3"
      >
        <DialogHeader>
          <DialogTitle>
            <Input
              className="placeholder:text-gray-400 border-0 border-b rounded-none border-gray-400"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </DialogTitle>
          <DialogDescription className="overflow-y-auto h-[20em]">
            {type === "chat"
              ? filteredData.map((item: any, index: number) => (
                  <SelectedUserChat
                    key={index}
                    keyId={index}
                    item={item}
                    isSelected={selectedItems.some(
                      (selected) => selected.id === item.id
                    )}
                    onSelect={() => handleSelect(item)}
                  />
                ))
              : filteredData.map((item: any, index: number) => (
                  <SearchUserValue key={index} item={item} />
                ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          {type === "chat" && (
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
            >
              OK
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserFromData;
