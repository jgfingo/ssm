-- 基础资料ID表
CREATE TABLE IF NOT EXISTS ICMaxNum(
FTableName NVARCHAR(50), -- 物料表名
FMaxNum INT -- 当前表最大ID
);
-- 获取最大值得存储过程
DROP PROCEDURE IF EXISTS p_GetMaxNum;

DELIMITER 
CREATE PROCEDURE p_GetMaxNum(
IN tablename NVARCHAR(50),
IN increment INT,
OUT maxinterid INT
)
BEGIN

START TRANSACTION;
	INSERT INTO ICMaxNum(FTableName,FMaxNum)
	SELECT tablename,1000 FROM DUAL WHERE NOT EXISTS(SELECT 1 FROM ICMaxNum WHERE Ftablename = tablename);
	
	SELECT FMaxNum INTO maxinterid FROM ICMaxNum WHERE FTableName = tablename;
	
	UPDATE ICMaxNum SET FMaxNum = FMaxNum + increment WHERE FTableName = tablename;
COMMIT;

END;
DELIMITER ;
-- 设备物理表
CREATE TABLE IF NOT EXISTS  T_Device
(
FInterID INT, -- 内码
FName NVARCHAR(50),-- 名称
FNumber NVARCHAR(50),-- 代码test
FFactoryID INT,-- 所属工厂ID
FWorkShopID INT,-- 所属车间ID
FWorkCenterID INT,-- 所属工作中心ID
FDayliWorkTimeH DECIMAL(23,10) -- 日工作时长(小时)
);

INSERT INTO ICMaxNum(FTableName,FMaxNum)
SELECT 'T_Device',1000 FROM DUAL WHERE NOT EXISTS(SELECT 1 FROM ICMaxNum WHERE Ftablename = 'T_Device');
-- 设备产能表
CREATE TABLE IF NOT EXISTS T_Device_Capcity
(
FDeviceID INT,-- 设备内码
FItemID INT,-- 物料内码
FCapcity DECIMAL(23,10) -- 节拍（秒）
);




