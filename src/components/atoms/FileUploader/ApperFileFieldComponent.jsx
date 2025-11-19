import React, { useState, useEffect, useRef, useMemo } from 'react';

const ApperFileFieldComponent = ({
  elementId,
  config
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const elementIdRef = useRef(null);
  const existingFilesRef = useRef(null);

  // Memoize existing files to prevent unnecessary re-renders
  const existingFiles = useMemo(() => {
    if (!config.existingFiles || !Array.isArray(config.existingFiles)) {
      return [];
    }
    
    // Compare by length and first file's ID to detect actual changes
    const currentFiles = config.existingFiles;
    if (existingFilesRef.current) {
      const prevFiles = existingFilesRef.current;
      if (prevFiles.length === currentFiles.length && 
          currentFiles.length > 0 && 
          prevFiles[0]?.Id === currentFiles[0]?.Id) {
        return existingFilesRef.current;
      }
    }
    
    existingFilesRef.current = currentFiles;
    return currentFiles;
  }, [config.existingFiles?.length, config.existingFiles?.[0]?.Id]);

  // Wait for ApperSDK to load
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    const checkSDK = () => {
      if (window.ApperSDK) {
        setIsReady(true);
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkSDK, 100); // Check every 100ms
      } else {
        console.error('ApperSDK not loaded after maximum attempts');
      }
    };
    
    checkSDK();
  }, []);

  // Mount component when SDK is ready
  useEffect(() => {
    if (!isReady || !elementId) return;

    const mountComponent = async () => {
      try {
        if (!window.ApperSDK) {
          throw new Error('ApperSDK not loaded. Please ensure the SDK script is included before this component.');
        }

        const { ApperFileUploader } = window.ApperSDK;
        elementIdRef.current = `file-uploader-${elementId}`;

        // Convert files format if needed
        let formattedFiles = [];
        if (existingFiles && existingFiles.length > 0) {
          // Check if files need API to UI format conversion
          const firstFile = existingFiles[0];
          if (firstFile && typeof firstFile.Id !== 'undefined') {
            // API format - convert to UI format
            formattedFiles = ApperFileUploader.toUIFormat(existingFiles);
          } else {
            // Already in UI format
            formattedFiles = existingFiles;
          }
        }

        await ApperFileUploader.FileField.mount(elementIdRef.current, {
          ...config,
          existingFiles: formattedFiles
        });

        setIsMounted(true);
      } catch (error) {
        console.error('Error mounting file field:', error);
      }
    };

    mountComponent();

    // Cleanup on unmount
    return () => {
      if (elementIdRef.current && window.ApperSDK?.ApperFileUploader) {
        const { ApperFileUploader } = window.ApperSDK;
        ApperFileUploader.FileField.unmount(elementIdRef.current);
        setIsMounted(false);
      }
    };
  }, [isReady, elementId, JSON.stringify(config)]);

  // Handle existing files changes
  useEffect(() => {
    if (!isMounted || !isReady || !config.fieldKey) return;

    const updateFiles = async () => {
      try {
        const { ApperFileUploader } = window.ApperSDK;
        
        if (existingFiles && existingFiles.length > 0) {
          // Convert format and update files
          let formattedFiles = [];
          const firstFile = existingFiles[0];
          if (firstFile && typeof firstFile.Id !== 'undefined') {
            formattedFiles = ApperFileUploader.toUIFormat(existingFiles);
          } else {
            formattedFiles = existingFiles;
          }
          
          await ApperFileUploader.FileField.updateFiles(config.fieldKey, formattedFiles);
        } else {
          // Clear files if existingFiles is empty
          await ApperFileUploader.FileField.clearField(config.fieldKey);
        }
      } catch (error) {
        console.error('Error updating files:', error);
      }
    };

    updateFiles();
  }, [existingFiles, isReady, isMounted, config.fieldKey]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg">
        <div className="text-sm text-gray-500">Loading file uploader...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id={`file-uploader-${elementId}`} className="file-uploader-container" />
    </div>
  );
};

export default ApperFileFieldComponent;