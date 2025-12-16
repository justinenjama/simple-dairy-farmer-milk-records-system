package com.justine.dairy_management_system.service;

import com.justine.dairy_management_system.dto.request.CowRequest;
import com.justine.dairy_management_system.dto.request.MilkRecordRequest;
import com.justine.dairy_management_system.dto.response.CowResponse;
import com.justine.dairy_management_system.dto.response.MilkRecordResponse;
import com.justine.dairy_management_system.dto.response.MilkReportResponse;

import java.time.LocalDate;
import java.util.List;

public interface DairyService {

    CowResponse addCow(CowRequest request);

    MilkRecordResponse addMilkRecord(MilkRecordRequest request);

    List<MilkRecordResponse> getMilkRecords();

    List<MilkReportResponse> getMilkReport(LocalDate startDate, LocalDate endDate);

    List<CowResponse> getAllCows();
}

