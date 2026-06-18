package com.protoserv;

import com.protoserv.model.StatusSolicitacao;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("Solicitação — Testes de Integração")
class SolicitacaoControllerTest extends BaseIntegrationTest {

    // =========================================================
    // ABERTURA
    // =========================================================
    @Nested
    @DisplayName("POST /solicitacoes — Abertura")
    class Abertura {

        @Test
        @DisplayName("TC-SOL-001 | Cidadão abre solicitação com dados válidos → 201")
        void abrirComDadosValidos() throws Exception {
            mockMvc.perform(post("/solicitacoes")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payloadAbertura(servico.getId())))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.protocolo").isNotEmpty())
                    .andExpect(jsonPath("$.status").value("NOVO"))
                    .andExpect(jsonPath("$.prioridade").value("MEDIA"))
                    .andExpect(jsonPath("$.dataConclusao").doesNotExist());
        }

        @Test
        @DisplayName("TC-SOL-002 | Abertura sem descrição → 400 com mensagem de validação")
        void abrirSemDescricao() throws Exception {
            String payload = """
                    {
                      "servicoId": %d,
                      "cep": "84010-010",
                      "logradouro": "Rua XV",
                      "numero": "1",
                      "bairro": "Centro",
                      "cidade": "Ponta Grossa",
                      "estado": "PR"
                    }
                    """.formatted(servico.getId());

            mockMvc.perform(post("/solicitacoes")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.erros.descricao").value("A descrição da solicitação é obrigatória."));
        }

        @Test
        @DisplayName("TC-SOL-003 | Serviço inexistente → 404")
        void abrirComServicoInexistente() throws Exception {
            mockMvc.perform(post("/solicitacoes")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payloadAbertura(99999L)))
                    .andExpect(status().isNotFound());
        }

        @Test
        @DisplayName("TC-SOL-004 | Solicitação duplicada ativa → 422")
        void abrirComSolicitacaoDuplicada() throws Exception {
            // Primeiro pedido
            mockMvc.perform(post("/solicitacoes")
                    .header("Authorization", tokenCidadao)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(payloadAbertura(servico.getId())));

            // Segundo pedido para o mesmo serviço
            mockMvc.perform(post("/solicitacoes")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payloadAbertura(servico.getId())))
                    .andExpect(status().isUnprocessableEntity())
                    .andExpect(jsonPath("$.mensagem").value(
                            org.hamcrest.Matchers.containsString("já possui uma solicitação em andamento")));
        }

        @Test
        @DisplayName("TC-SOL-005 | Atendente tenta abrir solicitação → 403")
        void atendenteNaoPodeAbrir() throws Exception {
            mockMvc.perform(post("/solicitacoes")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payloadAbertura(servico.getId())))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("TC-SEC-001 | Sem token → 401")
        void semTokenRetorna401() throws Exception {
            mockMvc.perform(post("/solicitacoes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payloadAbertura(servico.getId())))
                    .andExpect(status().isUnauthorized());
        }
    }

    // =========================================================
    // LISTAGEM
    // =========================================================
    @Nested
    @DisplayName("GET /solicitacoes — Listagem")
    class Listagem {

        @Test
        @DisplayName("TC-LIST-001 | Atendente lista todas as solicitações → 200 paginado")
        void atendenteListaTodas() throws Exception {
            criarSolicitacao(cidadao, StatusSolicitacao.NOVO);
            criarSolicitacao(cidadaoOutro, StatusSolicitacao.EM_ANDAMENTO);

            mockMvc.perform(get("/solicitacoes")
                            .header("Authorization", tokenAtendente))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content").isArray())
                    .andExpect(jsonPath("$.totalElements").value(
                            org.hamcrest.Matchers.greaterThanOrEqualTo(2)));
        }

        @Test
        @DisplayName("TC-LIST-002 | Filtro por status → retorna só as corretas")
        void filtrarPorStatus() throws Exception {
            criarSolicitacao(cidadao, StatusSolicitacao.NOVO);
            criarSolicitacao(cidadaoOutro, StatusSolicitacao.EM_ANDAMENTO);

            mockMvc.perform(get("/solicitacoes?status=NOVO")
                            .header("Authorization", tokenAtendente))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[*].status",
                            org.hamcrest.Matchers.everyItem(
                                    org.hamcrest.Matchers.is("NOVO"))));
        }

        @Test
        @DisplayName("TC-LIST-003 | Cidadão lista apenas as suas solicitações")
        void cidadaoListaSoASuas() throws Exception {
            criarSolicitacao(cidadao, StatusSolicitacao.NOVO);
            criarSolicitacao(cidadaoOutro, StatusSolicitacao.NOVO);

            mockMvc.perform(get("/solicitacoes/minhas")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.totalElements").value(1))
                    .andExpect(jsonPath("$.content[0].cidadao.email").value(cidadao.getEmail()));
        }

        @Test
        @DisplayName("TC-SEC-002 | Cidadão tenta acessar GET /solicitacoes → 403")
        void cidadaoNaoPodeListarTodas() throws Exception {
            mockMvc.perform(get("/solicitacoes")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("TC-LIST-004 | Cidadão detalha a própria solicitação → 200")
        void cidadaoDetalhaProprioItem() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.NOVO);

            mockMvc.perform(get("/solicitacoes/" + s.getId())
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(s.getId()))
                    .andExpect(jsonPath("$.protocolo").value(s.getProtocolo()));
        }

        @Test
        @DisplayName("TC-LIST-005 | Cidadão tenta detalhar solicitação de outro → 403")
        void cidadaoNaoPodeVerDeOutro() throws Exception {
            var s = criarSolicitacao(cidadaoOutro, StatusSolicitacao.NOVO);

            mockMvc.perform(get("/solicitacoes/" + s.getId())
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isForbidden());
        }
    }

    // =========================================================
    // ASSUMIR
    // =========================================================
    @Nested
    @DisplayName("PATCH /solicitacoes/{id}/assumir")
    class Assumir {

        @Test
        @DisplayName("TC-ASS-001 | Atendente assume solicitação NOVO → 200, status EM_ANDAMENTO")
        void atendenteAssumeSolicitacao() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.NOVO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/assumir")
                            .header("Authorization", tokenAtendente))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("EM_ANDAMENTO"))
                    .andExpect(jsonPath("$.atendente").isNotEmpty());
        }

        @Test
        @DisplayName("TC-ASS-002 | Assumir solicitação já EM_ANDAMENTO → 422")
        void assumirJaEmAndamento() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/assumir")
                            .header("Authorization", tokenAtendente))
                    .andExpect(status().isUnprocessableEntity());
        }

        @Test
        @DisplayName("TC-ASS-003 | Cidadão tenta assumir → 403")
        void cidadaoNaoPodeAssumir() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.NOVO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/assumir")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isForbidden());
        }
    }

    // =========================================================
    // ACOMPANHAMENTO
    // =========================================================
    @Nested
    @DisplayName("POST /solicitacoes/{id}/acompanhamentos")
    class Acompanhamento {

        @Test
        @DisplayName("TC-ACOMP-001 | Atendente adiciona acompanhamento → 200, lista aumenta")
        void atendenteAdicionaAcompanhamento() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            String payload = """
                    { "descricao": "Equipe enviada ao local." }
                    """;

            mockMvc.perform(post("/solicitacoes/" + s.getId() + "/acompanhamentos")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.acompanhamentos").isArray())
                    .andExpect(jsonPath("$.acompanhamentos.length()").value(
                            org.hamcrest.Matchers.greaterThanOrEqualTo(1)));
        }

        @Test
        @DisplayName("TC-ACOMP-002 | Atendente conclui via acompanhamento → status CONCLUIDA")
        void atendenteConclui() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            String payload = """
                    { "descricao": "Reparo concluído.", "novoStatus": "CONCLUIDA" }
                    """;

            mockMvc.perform(post("/solicitacoes/" + s.getId() + "/acompanhamentos")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("CONCLUIDA"))
                    .andExpect(jsonPath("$.dataConclusao").isNotEmpty());
        }

        @Test
        @DisplayName("TC-ACOMP-003 | Cidadão adiciona acompanhamento na própria solicitação → 200")
        void cidadaoAdicionaAcompanhamento() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            String payload = """
                    { "descricao": "O problema continua no mesmo local." }
                    """;

            mockMvc.perform(post("/solicitacoes/" + s.getId() + "/acompanhamentos")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("TC-ACOMP-004 | Cidadão tenta alterar status via acompanhamento → 403/422")
        void cidadaoNaoPodeAlterarStatus() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            String payload = """
                    { "descricao": "Quero encerrar.", "novoStatus": "CONCLUIDA" }
                    """;

            mockMvc.perform(post("/solicitacoes/" + s.getId() + "/acompanhamentos")
                            .header("Authorization", tokenCidadao)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().is4xxClientError());
        }

        @Test
        @DisplayName("TC-ACOMP-005 | Acompanhamento em solicitação CANCELADA → 422")
        void acompanhamentoEmCancelada() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.CANCELADA);
            String payload = """
                    { "descricao": "Tentativa após cancelamento." }
                    """;

            mockMvc.perform(post("/solicitacoes/" + s.getId() + "/acompanhamentos")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isUnprocessableEntity());
        }
    }

    // =========================================================
    // RECLASSIFICAÇÃO
    // =========================================================
    @Nested
    @DisplayName("PATCH /solicitacoes/{id}/classificacao")
    class Reclassificacao {

        @Test
        @DisplayName("TC-CLASS-001 | Atendente altera prioridade para URGENTE → 200")
        void alterarPrioridade() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            String payload = """
                    { "prioridade": "URGENTE" }
                    """;

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/classificacao")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.prioridade").value("URGENTE"));
        }

        @Test
        @DisplayName("TC-CLASS-002 | Sem mudança real → 200, sem acompanhamento extra")
        void semMudancaRealNaoCriaAcompanhamento() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);
            int acompanhamentosAntes = s.getAcompanhamentos().size();
            String payload = """
                    { "prioridade": "MEDIA" }
                    """;

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/classificacao")
                            .header("Authorization", tokenAtendente)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.acompanhamentos.length()").value(acompanhamentosAntes));
        }
    }

    // =========================================================
    // CANCELAR / REABRIR
    // =========================================================
    @Nested
    @DisplayName("PATCH cancelar e reabrir")
    class CancelarReabrir {

        @Test
        @DisplayName("TC-CANC-001 | Cidadão cancela a própria solicitação → 200, status CANCELADA")
        void cidadaoCancela() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.NOVO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/cancelar")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("CANCELADA"))
                    .andExpect(jsonPath("$.dataConclusao").isNotEmpty());
        }

        @Test
        @DisplayName("TC-CANC-002 | Cancelar solicitação já CANCELADA → 422")
        void cancelarJaCancelada() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.CANCELADA);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/cancelar")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isUnprocessableEntity());
        }

        @Test
        @DisplayName("TC-REAB-001 | Cidadão reabre solicitação CANCELADA → 200, status EM_ANDAMENTO")
        void cidadaoReobreCancelada() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.CANCELADA);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/reabrir")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("EM_ANDAMENTO"))
                    .andExpect(jsonPath("$.dataConclusao").doesNotExist());
        }

        @Test
        @DisplayName("TC-REAB-002 | Cidadão tenta reabrir solicitação EM_ANDAMENTO → 422")
        void naoReabreEmAndamento() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.EM_ANDAMENTO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/reabrir")
                            .header("Authorization", tokenCidadao))
                    .andExpect(status().isUnprocessableEntity());
        }

        @Test
        @DisplayName("TC-SEC-005 | Atendente tenta cancelar → 403")
        void atendenteNaoPodeCancelar() throws Exception {
            var s = criarSolicitacao(cidadao, StatusSolicitacao.NOVO);

            mockMvc.perform(patch("/solicitacoes/" + s.getId() + "/cancelar")
                            .header("Authorization", tokenAtendente))
                    .andExpect(status().isForbidden());
        }
    }
}
