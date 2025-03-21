import { FileDTO, LinkedResourceDTO, FileShareDTO, CreateFileShareDTO } from '../types/file';

// Dummy data
const dummyFiles: FileDTO[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    size: 1024000,
    type: 'application/pdf',
    lastModified: '2024-02-20T10:00:00Z',
    category: 'Ordering',
    uuid: 'uuid-1'
  },
  {
    id: '2',
    name: 'Meeting Notes.docx',
    size: 512000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    lastModified: '2024-02-19T15:30:00Z',
    category: 'Tasks',
    uuid: 'uuid-2'
  },
  {
    id: '3',
    name: 'Employee Handbook.pdf',
    size: 2048000,
    type: 'application/pdf',
    lastModified: '2024-02-18T09:15:00Z',
    category: 'Personnel',
    uuid: 'uuid-3'
  }
];

const dummyLinkedResources: Record<string, LinkedResourceDTO[]> = {
  '1': [
    { id: '1', name: 'Order #123', type: 'ORDER' },
    { id: '2', name: 'Customer: ABC Corp', type: 'CUSTOMER' }
  ],
  '2': [
    { id: '3', name: 'Task #456', type: 'TASK' },
    { id: '4', name: 'Project: Website Redesign', type: 'PROJECT' }
  ]
};

const dummySharingDetails: Record<string, FileShareDTO[]> = {
  '1': [
    { id: '1', userId: 'user1', userName: 'John Doe', permission: 'READ' },
    { id: '2', userId: 'user2', userName: 'Jane Smith', permission: 'WRITE' }
  ],
  '2': [
    { id: '3', userId: 'user3', userName: 'Mike Johnson', permission: 'READ' }
  ],
  '3': [
    { id: '4', userId: 'user4', userName: 'Sarah Wilson', permission: 'READ' }
  ]
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fileService = {
  // Get list of files
  getFiles: async (): Promise<FileDTO[]> => {
    await delay(500);
    return dummyFiles;
  },

  // Download file
  downloadFile: async (fileName: string): Promise<Blob> => {
    await delay(500);
    return new Blob(['Dummy file content'], { type: 'text/plain' });
  },

  // Preview file
  previewFile: async (fileName: string): Promise<Blob> => {
    await delay(500);
    return new Blob(['Dummy preview content'], { type: 'text/plain' });
  },

  // Get file details
  getFileDetails: async (file: FileDTO): Promise<LinkedResourceDTO[]> => {
    await delay(500);
    if (file.category === 'Personnel') {
      return [];
    }
    return dummyLinkedResources[file.id] || [];
  },

  // Add flag/tag to file
  addFlag: async (fileId: string, tag: any): Promise<void> => {
    await delay(500);
    console.log('Adding flag:', { fileId, tag });
  },

  // Remove flag/tag from file
  removeFlag: async (fileId: string, tag: any): Promise<void> => {
    await delay(500);
    console.log('Removing flag:', { fileId, tag });
  },

  // Share file
  shareFile: async (fileId: string, shareData: CreateFileShareDTO): Promise<void> => {
    await delay(500);
    console.log('Sharing file:', { fileId, shareData });
  },

  // Remove share
  removeShare: async (fileId: string, shareId: string): Promise<void> => {
    await delay(500);
    console.log('Removing share:', { fileId, shareId });
  },

  // Get file sharing details
  getFileSharingDetails: async (fileId: string): Promise<FileShareDTO[]> => {
    await delay(500);
    return dummySharingDetails[fileId] || [];
  },

  // Pin file
  pinFile: async (fileId: string): Promise<void> => {
    await delay(500);
    console.log('Pinning file:', fileId);
  },

  // Unpin file
  unpinFile: async (fileId: string): Promise<void> => {
    await delay(500);
    console.log('Unpinning file:', fileId);
  },

  // Favorite file
  favoriteFile: async (fileId: string): Promise<void> => {
    await delay(500);
    console.log('Favoriting file:', fileId);
  },

  // Unfavorite file
  unfavoriteFile: async (fileId: string): Promise<void> => {
    await delay(500);
    console.log('Unfavoriting file:', fileId);
  }
}; 