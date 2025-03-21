import { FileDTO, LinkedResourceDTO, FileShareDTO, CreateFileShareDTO } from '../types/file';

// Dummy data
const dummyFiles: FileDTO[] = [
  {
    id: '1',
    uuid: 'uuid-1',
    name: 'Invoice_Q1_2024.pdf',
    size: 2.1 * 1024 * 1024, // 2.1MB
    type: 'PDF',
    format: 'application/pdf',
    createdBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Ordering',
    status: 'active',
    accessLevel: ['Order', 'Task', 'Reseller', 'Client'],
    customTag: {
      status: 'Active',
      favorite: false,
      pinned: true
    }
  },
  {
    id: '2',
    uuid: 'uuid-2',
    name: 'Order_Confirmation.xlsx',
    size: 545 * 1024, // 545KB
    type: 'Excel',
    format: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    createdBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Production',
    status: 'archived',
    accessLevel: ['Order', 'Task'],
    customTag: {
      status: 'Archived',
      favorite: true,
      pinned: false
    }
  },
  {
    id: '3',
    uuid: 'uuid-3',
    name: 'Employee_Records.docx',
    size: 1.8 * 1024 * 1024, // 1.8MB
    type: 'Word',
    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    createdBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Bookkeeping',
    status: 'active',
    accessLevel: ['Task', 'Client'],
    customTag: {
      status: 'Active',
      favorite: false,
      pinned: false
    }
  },
  {
    id: '4',
    uuid: 'uuid-4',
    name: 'Annual_Report_2023.pdf',
    size: 3.5 * 1024 * 1024, // 3.5MB
    type: 'PDF',
    format: 'application/pdf',
    createdBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Personnel',
    status: 'archived',
    accessLevel: ['Task'],
    customTag: {
      status: 'Archived',
      favorite: true,
      pinned: true
    }
  },
  {
    id: '5',
    uuid: 'uuid-5',
    name: 'Invoice_Q1_2024.pdf',
    size: 2.1 * 1024 * 1024, // 2.1MB
    type: 'PDF',
    format: 'application/pdf',
    createdBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Administration',
    status: 'active',
    accessLevel: ['Order', 'Task', 'Reseller', 'Client'],
    customTag: {
      status: 'Active',
      favorite: false,
      pinned: true
    }
  },
  {
    id: '6',
    uuid: 'uuid-6',
    name: 'Order_Confirmation.xlsx',
    size: 545 * 1024, // 545KB
    type: 'Excel',
    format: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    createdBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Ordering',
    status: 'active',
    accessLevel: ['Order', 'Task'],
    customTag: {
      status: 'Active',
      favorite: false,
      pinned: false
    }
  },
  {
    id: '7',
    uuid: 'uuid-7',
    name: 'Employee_Records.docx',
    size: 1.8 * 1024 * 1024, // 1.8MB
    type: 'Word',
    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    createdBy: {
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg'
    },
    createdAt: '2024-02-02T14:00:00Z',
    modifiedBy: {
      name: 'David Smith',
      avatar: '/avatars/david.jpg'
    },
    modifiedAt: '2024-02-02T14:00:00Z',
    lastModified: '2024-02-02T14:00:00Z',
    category: 'Bookkeeping',
    status: 'deleted',
    accessLevel: ['Task'],
    customTag: {
      status: 'Deleted',
      favorite: false,
      pinned: false
    }
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