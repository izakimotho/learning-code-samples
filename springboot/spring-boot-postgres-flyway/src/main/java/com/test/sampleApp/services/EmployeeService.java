package com.test.sampleApp.services;

import com.test.sampleApp.models.DB.Employee;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    /**
     * list employees
     */
    List<Employee> getAllEmployees();
    /**
     * get employee by ID
     * @param id
     */
    Employee getEmployeeById(Integer id);
    /**
     * save employee
     * @param employee
     */
    Employee saveEmployee (Employee employee);
    /**
     * update employee
     * @param employee
     */
    Employee updateEmployee (Employee employee);
    /**
     * delete employees
     * @param id (employee id)
     */
    void deleteEmployeeById (Integer id);

}
