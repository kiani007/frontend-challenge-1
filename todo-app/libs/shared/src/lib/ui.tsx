

export const CancelButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" 
    >
      {children}
    </button>
  );
}

export const AddTaskButton = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => {
  return (
    <button
      {...props}
      className="ml-2 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300 ease-in-out" 
    >
      {children}
    </button>
  );
}
export const PriorityChipButton = ({id, priority, onClick }: { id: "low"|"medium"|"high"; priority: "low"|"medium"|"high"; onClick: (p: "low"|"medium"|"high") => void }) => {
  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 hover:text-white dark:hover:bg-blue-800',
    medium: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 hover:text-white dark:hover:bg-purple-800',
    high: 'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 hover:text-white dark:hover:bg-pink-800',
  };

  return (
    <button
      key={id}
      onClick={() => onClick(id)}
      className={
        `px-3 py-2 rounded-full hover:bg-gray-200 text-xs font-medium capitalize transition ${priority === id ?
           priorityClasses[id] : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'}`}
    >
      <p className={`text-sm font-medium ${priority === id ? 'text-white' : 'text-gray-300 dark:text-gray-400'}`}>
        {id}
      </p>
      
    </button>
  );
}


export const SaveButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      {children}
    </button>
  );
}
export const Input = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  onClick,
  disabled,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onClick={handleClick}
      disabled={disabled}
      className={`${className}`}
    />
  );
};
export const TextArea = ({ id, value, onChange, ...props }: { id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, [key: string]: any }) => {
  return (
    <textarea
      id= {id}
      {...props}
      rows={3}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}
export const Select = ({ options, value, onChange }: { options: string[]; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded p-2"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
export const Checkbox = ({ id, checked, onChange }: { id: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
    />
  );
}
export const Radio = ({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="border border-gray-300 rounded p-2"
    />
  );
}
export const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded p-4">
          <button onClick={onClose} className="absolute top-2 right-2">
            Close
          </button>
          {children}
        </div>
      </div>    
    )
  );
}
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      {children}
    </div>
  );
}
export const List = ({ items }: { items: React.ReactNode[] }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          {item}
        </li>
      )
      )}
    </ul>
  );
}