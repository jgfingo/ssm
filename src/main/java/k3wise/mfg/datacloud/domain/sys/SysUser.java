package k3wise.mfg.datacloud.domain.sys;

import java.io.Serializable;
import java.util.Date;

public class SysUser implements Serializable {
    private Integer userid;

	private String userno;

	private String username;

	private String password;
	
	private Integer sex;
	
	private String worknum;
	
	private Integer factoryid;
	
	private Integer deptid;
	
	private Integer locked;
	
	private String email;
	
	private String phone;
	
	private String mobile;
	
	private Date birthday;
	
	private Date entrydate;
	
	private Date createdate;
	
	private Date updatedate;


	public Integer getId() {
		return userid;
	}

	public void setId(Integer userid) {
		this.userid = userid;
	}

	public String getUserno() {
		return userno;
	}

	public void setUserno(String userno) {
		this.userno = userno;
	}

	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getWorknum() {
		return worknum;
	}

	public void setWorknum(String worknum) {
		this.worknum = worknum;
	}

	public Integer getFactoryid() {
		return factoryid;
	}

	public void setFactoryid(Integer factoryid) {
		this.factoryid = factoryid;
	}

	public Integer getDeptid() {
		return deptid;
	}

	public void setDeptid(Integer deptid) {
		this.deptid = deptid;
	}

	public Integer getLocked() {
		return locked;
	}

	public void setLocked(Integer locked) {
		this.locked = locked;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Date getEntrydate() {
		return entrydate;
	}

	public void setEntrydate(Date entrydate) {
		this.entrydate = entrydate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreatedate() {
		return createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public Date getUpdatedate() {
		return updatedate;
	}

	public void setUpdatedate(Date updatedate) {
		this.updatedate = updatedate;
	}

	
}