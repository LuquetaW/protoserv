package com.protoserv;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.protoserv.model.*;
import com.protoserv.repository.ServicoRepository;
import com.protoserv.repository.SolicitacaoRepository;
import com.protoserv.repository.UsuarioRepository;
import com.protoserv.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Classe base para todos os testes de integração.
 * Sobe o contexto completo com H2 in-memory.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public abstract class BaseIntegrationTest {

    @Autowired protected MockMvc mockMvc;
    @Autowired protected ObjectMapper objectMapper;
    @Autowired protected JwtService jwtService;
    @Autowired protected UsuarioRepository usuarioRepository;
    @Autowired protected ServicoRepository servicoRepository;
    @Autowired protected SolicitacaoRepository solicitacaoRepository;
    @Autowired protected PasswordEncoder passwordEncoder;

    // Usuários reutilizáveis nos testes
    protected Usuario cidadao;
    protected Usuario cidadaoOutro;
    protected Usuario atendente;
    protected Usuario admin;
    protected Servico servico;

    protected String tokenCidadao;
    protected String tokenCidadaoOutro;
    protected String tokenAtendente;
    protected String tokenAdmin;

    @BeforeEach
    void configurarFixtures() {
        cidadao = usuarioRepository.save(new Usuario(
                "João Cidadão", "cidadao@test.com",
                passwordEncoder.encode("Senha@123"), Perfil.CIDADAO));

        cidadaoOutro = usuarioRepository.save(new Usuario(
                "Maria Outro", "outro@test.com",
                passwordEncoder.encode("Senha@123"), Perfil.CIDADAO));

        atendente = usuarioRepository.save(new Usuario(
                "Ana Atendente", "atendente@test.com",
                passwordEncoder.encode("Senha@123"), Perfil.ATENDENTE));

        admin = usuarioRepository.save(new Usuario(
                "Carlos Admin", "admin@test.com",
                passwordEncoder.encode("Senha@123"), Perfil.ADMIN));

        servico = servicoRepository.save(new Servico(
                "Tapa-buraco", "Reparo de buracos em vias públicas",
                15, CategoriaServico.INFRAESTRUTURA, "Informe o endereço exato."));

        tokenCidadao = "Bearer " + jwtService.gerarToken(cidadao.getEmail(), cidadao.getPerfil());
        tokenCidadaoOutro = "Bearer " + jwtService.gerarToken(cidadaoOutro.getEmail(), cidadaoOutro.getPerfil());
        tokenAtendente = "Bearer " + jwtService.gerarToken(atendente.getEmail(), atendente.getPerfil());
        tokenAdmin = "Bearer " + jwtService.gerarToken(admin.getEmail(), admin.getPerfil());
    }

    /** Cria e persiste uma solicitação pronta para uso nos testes. */
    protected Solicitacao criarSolicitacao(Usuario dono, StatusSolicitacao statusDesejado) {
        var endereco = new Endereco("84010-010", "Rua XV de Novembro", "45",
                "Centro", "Ponta Grossa", "PR", null);
        var s = new Solicitacao("20260101-TEST1", "Buraco na rua", endereco, servico, dono, null);
        var salva = solicitacaoRepository.save(s);

        if (statusDesejado == StatusSolicitacao.EM_ANDAMENTO || statusDesejado == StatusSolicitacao.CONCLUIDA
                || statusDesejado == StatusSolicitacao.CANCELADA) {
            salva.assumir(atendente);
        }
        if (statusDesejado == StatusSolicitacao.CONCLUIDA) {
            salva.atualizarStatus(StatusSolicitacao.CONCLUIDA, atendente);
        }
        if (statusDesejado == StatusSolicitacao.CANCELADA) {
            salva.cancelar();
        }

        return solicitacaoRepository.save(salva);
    }

    /** Payload padrão de abertura de solicitação. */
    protected String payloadAbertura(Long servicoId) throws Exception {
        return """
                {
                  "servicoId": %d,
                  "descricao": "Buraco grande na esquina",
                  "cep": "84010-010",
                  "logradouro": "Rua XV de Novembro",
                  "numero": "45",
                  "bairro": "Centro",
                  "cidade": "Ponta Grossa",
                  "estado": "PR"
                }
                """.formatted(servicoId);
    }
}
