package k3wise.mfg.datacloud.quartz;

import java.util.Date;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


/**
 * 业务相关的作业调度
 * 
           字段               允许值                           允许的特殊字符
	秒	 	0-59	 	, - * /
	分	 	0-59	 	, - * /
	小时	 	0-23	 	, - * /
	日期	 	1-31	 	, - * ? / L W C
	月份	 	1-12 或者 JAN-DEC	 	, - * /
	星期	 	1-7 或者 SUN-SAT	 	, - * ? / L C #
	年（可选）	 	留空, 1970-2099	 	, - * /
	
	*  字符代表所有可能的值
	/  字符用来指定数值的增量
	L  字符仅被用于天（月）和天（星期）两个子表达式，表示一个月的最后一天或者一个星期的最后一天
	6L 可以表示倒数第６天
 *
 */
@Component
public class SpringQuartz {

	/**
	 * 每天9点到17点每过1分钟
	 */
	@Scheduled(cron = "0 0/1 9-17 * * ? ")
	public void quartz1() {
		long ms = System.currentTimeMillis();  
        System.out.println("\t\t"+"过了一分钟了:" + new Date(ms));
	}
	
	/**
	 * 每隔10秒
	 */
	@Scheduled(cron = "0/10 * * * * ? ")
	public  void quartz2() {
		long ms = System.currentTimeMillis();  
        System.out.println("\t\t"+"过了10秒钟了:" + new Date(ms));
	}
	
}
