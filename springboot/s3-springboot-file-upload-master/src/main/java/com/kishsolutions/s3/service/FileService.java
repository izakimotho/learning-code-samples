package com.kishsolutions.s3.service;

import com.kishsolutions.s3.dto.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    FileUploadResponse uploadFile(MultipartFile multipartFile);
}
