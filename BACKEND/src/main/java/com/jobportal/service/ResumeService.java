package com.jobportal.service;

import com.jobportal.entity.Resume;
import com.jobportal.entity.User;
import com.jobportal.repository.ResumeRepository;
import com.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;

    private final UserRepository userRepository;

    private final PdfService pdfService;

    private final KafkaProducerService kafkaProducerService;

    public String uploadResume(
            Long userId,
            MultipartFile file)
            throws Exception {

        String uploadDir = "uploads/";

        Files.createDirectories(
                Paths.get(uploadDir));

        String filePath =
                uploadDir +
                        file.getOriginalFilename();

        Path path =
                Paths.get(filePath);

        Files.write(
                path,
                file.getBytes());

        String extractedText =
                pdfService.extractText(
                        filePath);

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow();

        Resume resume =
                resumeRepository
                        .findByUserId(userId)
                        .orElse(new Resume());

        resume.setFileName(
                file.getOriginalFilename());

        resume.setFilePath(
                filePath);

        resume.setExtractedText(
                extractedText);

        resume.setUser(user);

        resumeRepository.save(resume);

      //  kafkaProducerService.sendResumeUploadedEvent("Resume Uploaded By User "+ userId);

       return "Resume Uploaded";

}
}