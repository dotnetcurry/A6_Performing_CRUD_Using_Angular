CREATE TABLE [dbo].[Employee]
(
	[EmpNo] INT Identity PRIMARY KEY,
	[EmpName] varchar(100) Not Null,
	[Salary] int Not Null,
	[DeptName] varchar(50) Not Null,
	[Designation] varchar(50) Not Null
)

