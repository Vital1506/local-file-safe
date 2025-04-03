
import { 
  FileType, 
  File as FileIcon,
  Image, 
  FileSpreadsheet, 
  FileText
} from 'lucide-react';

type FileIconProps = {
  fileType: string;
  size?: "sm" | "md" | "lg";
};

const getIconSize = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm": return "h-6 w-6";
    case "lg": return "h-12 w-12";
    default: return "h-10 w-10";
  }
};

const FileIconComponent = ({ fileType, size = "md" }: FileIconProps) => {
  const sizeClass = getIconSize(size);
  
  if (fileType.includes('pdf')) 
    return <FileType className={`${sizeClass} text-red-500`} />;
  
  if (fileType.includes('image')) 
    return <Image className={`${sizeClass} text-blue-500`} />;
  
  if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('csv')) 
    return <FileSpreadsheet className={`${sizeClass} text-green-500`} />;
  
  if (fileType.includes('word') || fileType.includes('document')) 
    return <FileText className={`${sizeClass} text-blue-500`} />;
  
  return <FileIcon className={`${sizeClass} text-gray-500`} />;
};

export default FileIconComponent;
