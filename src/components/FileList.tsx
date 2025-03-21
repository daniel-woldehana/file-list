import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Info as InfoIcon,
  Share as ShareIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  PushPin as PushPinIcon,
  PushPinOutlined as PushPinOutlinedIcon,
} from '@mui/icons-material';
import { FileDTO, FileFilter } from '../types/file';
import { fileService } from '../services/api';

interface FileListProps {
  onFileSelect: (file: FileDTO) => void;
  onShareClick: (file: FileDTO) => void;
  onPreviewClick: (file: FileDTO) => void;
}

export const FileList: React.FC<FileListProps> = ({
  onFileSelect,
  onShareClick,
  onPreviewClick,
}) => {
  const [files, setFiles] = useState<FileDTO[]>([]);
  const [filter, setFilter] = useState<FileFilter>({
    search: '',
    category: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await fileService.getFiles();
      setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file: FileDTO) => {
    try {
      const blob = await fileService.downloadFile(file.uuid);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFavorite = async (file: FileDTO) => {
    try {
      if (file.customTag?.favorite) {
        await fileService.unfavoriteFile(file.id);
      } else {
        await fileService.favoriteFile(file.id);
      }
      loadFiles(); // Reload to update the UI
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handlePin = async (file: FileDTO) => {
    try {
      if (file.customTag?.pinned) {
        await fileService.unpinFile(file.id);
      } else {
        await fileService.pinFile(file.id);
      }
      loadFiles(); // Reload to update the UI
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(filter.search?.toLowerCase() || '');
      const matchesCategory = !filter.category || file.category === filter.category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const order = filter.sortOrder === 'asc' ? 1 : -1;
      switch (filter.sortBy) {
        case 'name':
          return order * a.name.localeCompare(b.name);
        case 'size':
          return order * (a.size - b.size);
        case 'lastModified':
          return order * (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime());
        default:
          return 0;
      }
    });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter.category}
            label="Category"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Ordering">Ordering</MenuItem>
            <MenuItem value="Tasks">Tasks</MenuItem>
            <MenuItem value="Personnel">Personnel</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filter.sortBy}
            label="Sort By"
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as FileFilter['sortBy'] })}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="size">Size</MenuItem>
            <MenuItem value="lastModified">Last Modified</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={() => setFilter({ ...filter, sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' })}
        >
          {filter.sortOrder === 'asc' ? '↑' : '↓'}
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.category}</TableCell>
                <TableCell>{Math.round(file.size / 1024)} KB</TableCell>
                <TableCell>{new Date(file.lastModified).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDownload(file)}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton onClick={() => onPreviewClick(file)}>
                    <PreviewIcon />
                  </IconButton>
                  <IconButton onClick={() => onFileSelect(file)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton onClick={() => onShareClick(file)}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton onClick={() => handleFavorite(file)}>
                    {file.customTag?.favorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
                  </IconButton>
                  <IconButton onClick={() => handlePin(file)}>
                    {file.customTag?.pinned ? <PushPinIcon color="primary" /> : <PushPinOutlinedIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 