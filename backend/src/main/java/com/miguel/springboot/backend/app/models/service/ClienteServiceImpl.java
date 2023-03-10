package com.miguel.springboot.backend.app.models.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miguel.springboot.backend.app.models.dao.IClienteDao;
import com.miguel.springboot.backend.app.models.entity.Cliente;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired
	private IClienteDao clienteDao;

	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {

		return (List<Cliente>) clienteDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Cliente findById(Long id) {
		// metodo de busqueda por Id
		return clienteDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		// ahh
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		//* eliminacion por Id */
		clienteDao.deleteById(id);
	}
}
