package com.justine.dairy_management_system.controller;

import com.justine.dairy_management_system.dto.request.CowRequest;
import com.justine.dairy_management_system.dto.request.MilkRecordRequest;
import com.justine.dairy_management_system.dto.response.CowResponse;
import com.justine.dairy_management_system.dto.response.MilkRecordResponse;
import com.justine.dairy_management_system.dto.response.MilkReportResponse;
import com.justine.dairy_management_system.service.DairyService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DairyController {

    private final DairyService dairyService;

    public DairyController(DairyService dairyService) {
        this.dairyService = dairyService;
    }

    // Add cow
    @PostMapping("/cows")
    public CowResponse addCow(@Valid @RequestBody CowRequest request) {
        return dairyService.addCow(request);
    }

    // Get all cows
    @GetMapping("/cows")
    public List<CowResponse> getCows() {
        return dairyService.getAllCows();
    }

    // add milk record
    @PostMapping("/milk/add")
    public MilkRecordResponse addMilk(
            @Valid @RequestBody MilkRecordRequest request
    ) {
        return dairyService.addMilkRecord(request);
    }

    // View all milk records
    @GetMapping("/milk")
    public List<MilkRecordResponse> getMilkRecords() {
        return dairyService.getMilkRecords();
    }

    // Weekly / Monthly report
    @GetMapping("/milk/report")
    public List<MilkReportResponse> getMilkReport(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        return dairyService.getMilkReport(startDate, endDate);
    }
}
