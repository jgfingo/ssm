package k3wise.mfg.datacloud.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import k3wise.mfg.datacloud.Utils.CacheUtil;
import k3wise.mfg.datacloud.mapper.UserTestMapper;
import k3wise.mfg.datacloud.service.UserTestService;

@Service
@CacheConfig(cacheNames="testdemo")
public class UserTestServiceImpl implements UserTestService {

	@Autowired
	UserTestMapper usertestmapper;
	
	
	@Override
	public List<Map<String, Object>> getdata(String sql) {
		 //缓存测试，存在60秒，有缓存取缓存
		if(CacheUtil.hasKey("testrs")) {
			return CacheUtil.getList("testrs");
		}else {
			List<Map<String, Object>> result=usertestmapper.selectbysql(sql);
			CacheUtil.setList("testrs", result, 60);
			return result;
		}
	}

	@Cacheable(key="#key#")
	@Override
	public String testRs(String key, String value) {
		return value;
	}


	
	
}
