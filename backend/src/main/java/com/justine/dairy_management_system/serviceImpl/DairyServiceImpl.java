package com.justine.dairy_management_system.serviceImpl;

import com.justine.dairy_management_system.dto.request.CowRequest;
import com.justine.dairy_management_system.dto.request.MilkRecordRequest;
import com.justine.dairy_management_system.dto.response.CowResponse;
import com.justine.dairy_management_system.dto.response.MilkRecordResponse;
import com.justine.dairy_management_system.dto.response.MilkReportResponse;
import com.justine.dairy_management_system.exception.InternalServerErrorException;
import com.justine.dairy_management_system.exception.NotFoundException;
import com.justine.dairy_management_system.exception.ValidationException;
import com.justine.dairy_management_system.model.Cow;
import com.justine.dairy_management_system.model.MilkRecord;
import com.justine.dairy_management_system.repository.CowRepository;
import com.justine.dairy_management_system.repository.MilkRecordRepository;
import com.justine.dairy_management_system.service.DairyService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DairyServiceImpl implements DairyService {

    private final CowRepository cowRepository;
    private final MilkRecordRepository milkRecordRepository;

    public DairyServiceImpl(CowRepository cowRepository,
                            MilkRecordRepository milkRecordRepository) {
        this.cowRepository = cowRepository;
        this.milkRecordRepository = milkRecordRepository;
    }

    @Override
    public CowResponse addCow(CowRequest request) {
        try {
            if (request.getName() == null || request.getName().isBlank()) {
                throw new ValidationException("Cow name is required");
            }

            Cow cow = Cow.builder()
                    .name(request.getName())
                    .breed(request.getBreed())
                    .age(request.getAge())
                    .build();

            Cow saved = cowRepository.save(cow);

            return CowResponse.builder()
                    .id(saved.getId())
                    .name(saved.getName())
                    .breed(saved.getBreed())
                    .age(saved.getAge())
                    .build();

        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to add cow");
        }
    }

    @Override
    public List<CowResponse> getAllCows() {
        try {
            List<Cow> cows = cowRepository.findAll();

            return cows.stream()
                    .map(cow -> CowResponse.builder()
                            .id(cow.getId())
                            .name(cow.getName())
                            .breed(cow.getBreed())
                            .age(cow.getAge())
                            .build())
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to fetch cows");
        }
    }

    @Override
    public MilkRecordResponse addMilkRecord(MilkRecordRequest request) {
        try {
            if (request.getAmount() <= 0) {
                throw new ValidationException("Milk amount must be greater than zero");
            }

            Cow cow = cowRepository.findById(request.getCowId())
                    .orElseThrow(() ->
                            new NotFoundException("Cow with ID " + request.getCowId() + " not found")
                    );

            MilkRecord record = MilkRecord.builder()
                    .cow(cow)
                    .date(request.getDate())
                    .amount(request.getAmount())
                    .build();

            MilkRecord saved = milkRecordRepository.save(record);

            return MilkRecordResponse.builder()
                    .id(saved.getId())
                    .date(saved.getDate())
                    .amount(saved.getAmount())
                    .cowId(cow.getId())
                    .cowName(cow.getName())
                    .build();

        } catch (NotFoundException | ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to add milk record");
        }
    }

    @Override
    public List<MilkRecordResponse> getMilkRecords() {
        try {
            return milkRecordRepository.findAll()
                    .stream()
                    .map(record -> MilkRecordResponse.builder()
                            .id(record.getId())
                            .date(record.getDate())
                            .amount(record.getAmount())
                            .cowId(record.getCow().getId())
                            .cowName(record.getCow().getName())
                            .build())
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to fetch milk records");
        }
    }

    @Override
    public List<MilkReportResponse> getMilkReport(LocalDate startDate, LocalDate endDate) {
        try {
            if (startDate.isAfter(endDate)) {
                throw new ValidationException("Start date cannot be after end date");
            }

            LocalDateTime start = startDate.atStartOfDay();
            LocalDateTime end = endDate.atTime(23, 59, 59);

            List<MilkRecord> records =
                    milkRecordRepository.findBetweenDates(start, end);

            if (records.isEmpty()) {
                throw new NotFoundException("No milk records found for given period");
            }

            Map<Cow, Double> totals = new HashMap<>();
            for (MilkRecord record : records) {
                totals.merge(record.getCow(), record.getAmount(), Double::sum);
            }

            return totals.entrySet()
                    .stream()
                    .map(entry -> MilkReportResponse.builder()
                            .cowId(entry.getKey().getId())
                            .cowName(entry.getKey().getName())
                            .totalMilk(entry.getValue())
                            .build())
                    .collect(Collectors.toList());

        } catch (NotFoundException | ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalServerErrorException("Failed to generate milk report");
        }
    }
}
