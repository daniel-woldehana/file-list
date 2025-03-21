import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { FileList } from './components/FileList';
import { FileDetailsModal } from './components/FileDetailsModal';
import { FileShareModal } from './components/FileShareModal';
import { FileDTO } from './types/file';

function App() {
  const [selectedFile, setSelectedFile] = useState<FileDTO | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleFileSelect = (file: FileDTO) => {
    setSelectedFile(file);
    setDetailsModalOpen(true);
  };

  const handleShareClick = (file: FileDTO) => {
    setSelectedFile(file);
    setShareModalOpen(true);
  };

  const handlePreviewClick = (file: FileDTO) => {
    // Handle preview logic here
    console.log('Preview file:', file);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          File List
        </Typography>
        
        <FileList
          onFileSelect={handleFileSelect}
          onShareClick={handleShareClick}
          onPreviewClick={handlePreviewClick}
        />

        <FileDetailsModal
          file={selectedFile}
          open={detailsModalOpen}
          onClose={() => {
            setDetailsModalOpen(false);
            setSelectedFile(null);
          }}
        />

        <FileShareModal
          file={selectedFile}
          open={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setSelectedFile(null);
          }}
        />
      </Box>
    </Container>
  );
}

export default App; 